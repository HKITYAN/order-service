import { Injectable, HttpService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get("MAP_SERVICE_URL");
        this.format = this.configService.get("MAP_SERVICE_OUTPUT_FORMAT");
        this.units = this.configService.get("MAP_SERVICE_OUTPUT_UNIT")
        this.key = this.configService.get("MAP_SERVICE_KEY")
        
    }

    private readonly baseUrl;
    private readonly format;
    private readonly units;
    private readonly key;

    private readonly logger = new Logger(MapService.name); 
    

    getDistance = async (origin: string, destination: string) : Promise<number> => {
        this.logger.log("Getting distance from google metric api")
        const mapServiceUrl = `${this.baseUrl}/${this.format}?units=${this.units}&origins=${origin}&destinations=${destination}&key=${this.key}`
        const disatnce = await this.httpService.get(mapServiceUrl).toPromise()
        .then(response => {
            const { status, rows, error_message } = response.data;
            if (status !== 'OK') {
                this.logger.warn(`Fail to get distance, error message: ${error_message}`)
                return null
            };
            return rows[0]?.elements[0]?.distance?.value
        })
        .catch(err => {
            this.logger.error(`Error occurs during request, error message: ${err.message} `)
            return null;
        });
        return disatnce;
    }
}
