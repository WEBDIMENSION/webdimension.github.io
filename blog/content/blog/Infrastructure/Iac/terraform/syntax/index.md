---
title: "Terraform 構文"
date: "2022-07-02 08:24:19"
post_modified: "2022-07-02 08:24:19"
description: "Terraformで使える演算子"
categories: ["Infrastructure"]
tags: ["Terraform", "Iac"]
draft: false
---

## 三項演算子

```tf
instance_type = var.env == "prod" ? "m5.large" : "t3.micro"
```

```bash
terraform plan -var 'env=stage'
```

## Count

```tf
# 3回 resource "aws_vpc" が事項される
resource "aws_vpc" "examples" {
  count      = 3
  cidr_block = "10.${count.index}.0.0/16"
}
```

## 三項演算子とCountの組み合わせ

```tf
variable "allow_ssh" {
  type = bool
}

resource "aws_security_group" "example" {
  name = "example"
}

resource "aws_security_group_rule" "egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.example.id
}

resource "aws_security_group_rule" "ingress" {
  count = var.allow_ssh ? 1 : 0

  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.example.id
}

output "allow_ssh_rule_id" {
  value = join("", aws_security_group_rule.ingress[*].id)
}
```

```tf
module "allow_ssh" {
  source    = "./security_group"
  allow_ssh = true
}

output "allow_ssh_rule_id" {
  value = module.allow_ssh.allow_ssh_rule_id
}

```

## terraform console

```bash
# 対話式
docker-compose exec terraform terraform console
```

組み込み関数例

- cidrsubnet("10.1.0.0/16", 8, 3)
- max(1, 100, 10)
- substr("Pragmatic Terraform on AWS", 10, 9)
- flatten([["Pragmatic"], ["Terraform", ["on", "AWS"]]])
- templatefile("${path.module}/install.sh", { package = "httpd" })

[公式ドキュメント](https://www.terraform.io/language/functions)

## パスワード生成

```tf
provider "random" {}

resource "random_string" "password" {
  length  = 32
  special = false
}
```

```tf
resource "aws_db_instance" "example" {
  engine              = "mysql"
  instance_class      = "db.t3.small"
  allocated_storage   = 20
  skip_final_snapshot = true
  username            = "admin"
  password            = random_string.password.result
}
```

## Dynamic blocks

modules/sg.tf

```tf
variable "ingress_rules" {
  type = map(
    object(
      {
        port        = number
        cidr_blocks = list(string)
      }
    )
  )
}

resource "aws_security_group" default {
  name = "sg"

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      cidr_blocks = ingress.value.cidr_blocks
      description = "Allow ${ingress.key}"
      protocol    = "tcp"
    }
  }
}
```

```tf
module "sg" {
  source = "./modules/sg.tf"

  ingress_rules = {
    http = {
      port        = 80
      cidr_blocks = ["10.0.0.0/8", "172.16.0.0/12"]
    }
    https = {
      port        = 443
      cidr_blocks = ["0.0.0.0/0"]
    }
    redirect_http_to_https = {
      port        = 8080
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
```
