# How to ssh into your production environment server.

ssh -i ../AWS_Production.pem ubuntu@freindzie.click

## To modify a Caddy File
vi Caddyfile

Save the file and exit vi :wq

Restart Caddy:

sudo service caddy restart