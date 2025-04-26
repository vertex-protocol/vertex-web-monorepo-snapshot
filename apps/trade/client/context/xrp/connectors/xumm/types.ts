/**
 * Payload subscription message received when a payload is signed
 *
 * @example see below
 * {
 *   "payload_uuidv4": "390adba3-a880-4463-ab4d-28470df5e364",
 *   "reference_call_uuidv4": "c4b6f36f-9189-469f-96b7-b98833f74169",
 *   "signed": true,
 *   "user_token": true,
 *   "return_url": {
 *     "app": null,
 *     "web": null
 *   },
 *   "txid": "5F90E6622F12EDC610B6511A40C61B0E386AEC3D815CB3A668633C665882734B",
 *   "opened_by_deeplink": true,
 *   "custom_meta": {
 *     "identifier": null,
 *     "instruction": "Sign request from Vertex"
 *   }
 * }
 */
export interface SignedXummPayloadSubscriptionMessage {
  payload_uuidv4: string;
  reference_call_uuidv4: string;
  signed: boolean;
  user_token: boolean;
  return_url: {
    app: string | null;
    web: string | null;
  };
  txid: string;
  opened_by_deeplink: boolean;
  custom_meta: {
    identifier: string | null;
    instruction: string;
  };
}
