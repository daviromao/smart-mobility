export interface ResourceDataResponse {
  uuid: string;
  capabilities: {
    environment_monitoring: [
      {
        temperature: number;
        humidity: number;
        pressure: number;
        date: string;
      }
    ];
  };
}
