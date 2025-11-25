FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Check if the user 'node' already exists (most official node images have it)
# If it doesn't, create it with a specific UID/GID (e.g., 1000:1000)
ARG USER_UID=1000
ARG USER_GID=1000

RUN if ! getent passwd node ; then \
    groupadd --gid $USER_GID node ; \
    useradd -m --uid $USER_UID --gid $USER_GID --shell /bin/bash node ; \
fi

# Set the default user for subsequent commands (optional, but good practice)
USER node


RUN sudo apt-get update && sudo apt-get install -y openjdk-17-jdk

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="/opt/android-sdk/platform-tools:/opt/android-sdk/emulator:/opt/android-sdk/cmdline-tools/latest/bin:${PATH}"


CMD ["bash", "-c", "while true; do sleep 10000; done"]