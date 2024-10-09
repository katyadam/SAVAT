package org.adamkattan;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class AnalysisInputTest {

    @Test
    public void testUploadAnalysisInput() throws IOException {
        String body = new String(Files.readAllBytes(Paths.get("src/test/resources/example-body.json")));

        given()
                .contentType("application/json")
                .body(body)
                .when()
                .post("/analysis-inputs")
                .then()
                .statusCode(201);

        given()
                .when()
                .get("/analysis-inputs?appName=TEST")
                .then()
                .statusCode(200);
    }
}
