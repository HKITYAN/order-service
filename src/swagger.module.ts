import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from "@nestjs/common"
export class Swagger {
    static start (env: String, app: INestApplication) {
        if (env === "PRODUCTION") return
        const options = new DocumentBuilder()
            .setTitle('Order Delivery Service')
            .setDescription('Swagger for order delivery apis')
            .setVersion('1.0')
            .addTag('')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('swagger', app, document);
    }
}