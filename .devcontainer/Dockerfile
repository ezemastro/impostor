FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Instalar Java
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip

# Instalar Android SDK
RUN mkdir -p /usr/local/android-sdk \
  && cd /usr/local/android-sdk \
  && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
  && unzip commandlinetools-linux-11076708_latest.zip \
  && rm commandlinetools-linux-11076708_latest.zip

# Crear la estructura de directorios requerida - CORREGIDO
RUN mkdir -p /usr/local/android-sdk/cmdline-tools/latest \
  && mv /usr/local/android-sdk/cmdline-tools/bin /usr/local/android-sdk/cmdline-tools/lib /usr/local/android-sdk/cmdline-tools/NOTICE.txt /usr/local/android-sdk/cmdline-tools/source.properties /usr/local/android-sdk/cmdline-tools/latest/ 2>/dev/null || true

# Configurar variables de entorno
ENV ANDROID_HOME=/usr/local/android-sdk
ENV ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Aceptar licencias automáticamente
RUN yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses

# Instalar componentes básicos de Android SDK
RUN $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"