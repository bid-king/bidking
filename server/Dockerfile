FROM openjdk:11-jdk-slim AS builder
WORKDIR /app
# COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew build

FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar 

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]