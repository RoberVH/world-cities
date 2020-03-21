#/bin/bash
# Run docker image and open an interactive command without relying on compose start command
# Useful for initial bootstrap image and setups
docker run -it robervh/visiting-cities /bin/sh