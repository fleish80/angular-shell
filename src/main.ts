// import { initFederation } from '@angular-architects/module-federation';

// initFederation('/assets/mf.manifest.json')
//   .catch(err => console.error(err))
//   .then(_ => import('./bootstrap'))
//   .catch(err => console.error(err));

import { setManifest } from '@angular-architects/module-federation';
import { CustomManifest } from './app/mf.model';
const mfManifestJson = fetch('/assets/mf.manifest.json');
const parseConfig = async (mfManifest: Promise<Response>) => {
  const manifest: CustomManifest = await (await mfManifest).json();
  const filterManifest: CustomManifest = {};
  for (const key of Object.keys(manifest)) {
    const value = manifest[key];
    // check more details
    if (value.isActive === true) {
      filterManifest[key] = value;
    }
  }
  return filterManifest;
};
parseConfig(mfManifestJson)
  .then((data) => setManifest(data))
  .catch((err) => console.log(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.log(err));
