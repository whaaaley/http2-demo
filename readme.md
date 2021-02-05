
# BikeForce Server

## Generate Certificates

```sh
openssl req -nodes -sha256 -x509 \
  -newkey rsa:2048 \
  -subj '/CN=localhost' \
  -keyout localhost-key.pem \
  -out localhost-cert.pem
```
