import { AxiosStatic } from 'axios';

export class StormGlass {
    readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
    readonly stormGlassAPISource = 'noaa';

    constructor(protected request: AxiosStatic) {}
// 360cd8f2-ee87-11ed-86b2-0242ac130002-360cd956-ee87-11ed-86b2-0242ac130002
    public async fetchPoints(lat: number, lng: number): Promise<{}> {
        // https://api.stormglass.io/v2/weather/point?params=swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed&source=noaa&lat=58.7984&lng=17.8081
        // this.request.get(`https://api.stormglass.io/v2/weather/point?params=${this.stormGlassParams}&source=noaa&lat=${lat}&lng=${lng}`);

        this.request.get(`https://api.stormglass.io/v2/weather/point?params=swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed&source=noaa&lat=58.7984&lng=17.8081`);
        return Promise.resolve({});        
    }
}