import { AgustoServices } from '@agustodev/agusto-services-sdk';

export const AgustoServicesSdk = new AgustoServices({
  baseUrl: `${process.env.AGUSTO_SERVICES_URL}`,
  apiKey: 'anything',
});
