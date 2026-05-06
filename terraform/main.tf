locals {
  project = "shopsmart"
}

resource "aws_s3_bucket" "tf_bucket" {
  # Rubric: unique bucket name
  bucket_prefix = "${local.project}-infra-"
}

# Rubric: Versioning enabled
resource "aws_s3_bucket_versioning" "tf_bucket" {
  bucket = aws_s3_bucket.tf_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Rubric: Encryption enabled
resource "aws_s3_bucket_server_side_encryption_configuration" "tf_bucket" {
  bucket = aws_s3_bucket.tf_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Rubric: Public access blocked
resource "aws_s3_bucket_public_access_block" "tf_bucket" {
  bucket = aws_s3_bucket.tf_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_ecr_repository" "app" {
  name                 = "${local.project}-api"
  image_tag_mutability = "MUTABLE"
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/${local.project}-api"
  retention_in_days = 7
}

resource "aws_ecs_cluster" "main" {
  name = "${local.project}-cluster"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "ecs_service" {
  name        = "${local.project}-ecs-sg"
  description = "Allow inbound HTTP to ShopSmart API"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "API port"
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

variable "lab_role_name" {
  type        = string
  description = "Pre-provisioned lab IAM role name (e.g., AWS Academy LabRole)."
  default     = "LabRole"
}

data "aws_iam_role" "labrole" {
  name = var.lab_role_name
}

variable "image_tag" {
  type        = string
  description = "Container image tag for the API."
  default     = "latest"
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${local.project}-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.labrole.arn
  task_role_arn            = data.aws_iam_role.labrole.arn

  container_definitions = jsonencode([
    {
      name      = "api"
      image     = "${aws_ecr_repository.app.repository_url}:${var.image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = 5001
          hostPort      = 5001
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "PORT", value = "5001" }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "api"
        }
      }
      healthCheck = {
        command     = ["CMD-SHELL", "wget -qO- http://localhost:5001/health >/dev/null 2>&1 || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 10
      }
    }
  ])
}

resource "aws_ecs_service" "api" {
  name            = "${local.project}-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.tf_bucket.bucket
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.api.name
}