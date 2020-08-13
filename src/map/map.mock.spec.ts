export class MapServiceMock {
    getDistance = async (origin: string, destination: string) : Promise<number> => {
        return new Promise((resolve, reject) => {
            if (origin[0] === "1") {
                resolve(200)
            } else {
                resolve(null)
            };
        })
    }
}