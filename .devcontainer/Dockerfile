FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Instalar Java
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip

# Variables
ENV ANDROID_HOME=/usr/local/android-sdk
ENV ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Instalar cmdline-tools
RUN mkdir -p $ANDROID_HOME/cmdline-tools \
  && cd $ANDROID_HOME/cmdline-tools \
  && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
  && unzip commandlinetools-linux-11076708_latest.zip \
  && rm commandlinetools-linux-11076708_latest.zip \
  && mv cmdline-tools latest

# Aceptar licencias
RUN yes | sdkmanager --licenses

# Instalar SDK necesarios
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
