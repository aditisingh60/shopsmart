


provider "aws" {
  region = "ap-east-1"
}

resource "aws_s3_bucket_website_configuration" "example" {
  bucket = "shopsmart-terraform-state-001"

  index_document {
    suffix = "index.html"
  }
}