terraform {
  backend "s3" {
    bucket = "shopsmart-terraform-state-001"
    key    = "shopsmart/terraform.tfstate"
    region = "us-east-1"
  }
}