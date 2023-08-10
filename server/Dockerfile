FROM openjdk:11-jdk

WORKDIR /app

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} /app.jar 

EXPOSE 5000

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "/app.jar"]