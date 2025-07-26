import { SearchBoxCore, SessionToken } from '@mapbox/search-js-core';

import type {
  // biome-ignore lint/style/noExportedImports: <explanation>
  SearchBoxFeatureProperties,
} from '@mapbox/search-js-core/dist/searchbox/types';

export type { SearchBoxFeatureProperties };

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  throw new Error('Mapbox token is not set');
}

export const search = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });
export const sessionToken = new SessionToken();

export async function getAddressFromCoordinates(
  lat: number,
  lng: number
): Promise<SearchBoxFeatureProperties> {
  const results = await search.reverse([lng, lat]);
  if (results?.features && results.features.length > 0) {
    return results.features[0].properties;
  }
  throw new Error('No address found');
}
