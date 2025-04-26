import { get } from 'lodash';
import {
  CreateXrpLinkedSignerParams,
  CreateXrpLinkedSignerResponse,
} from 'server/createXrpLinkedSignerTypes';
import { encodePacked, isHex, keccak256 } from 'viem';

const SECRET_SALT = process.env.XRP_LINKED_SIGNER_SECRET_SALT;

export async function POST(request: Request) {
  if (!SECRET_SALT) {
    return new Response('Missing secret environment variable', {
      status: 500,
    });
  }

  const requestBody: CreateXrpLinkedSignerParams = await request.json();
  const signedAuthorization = get(requestBody, 'signedAuthorization');

  if (!signedAuthorization || !isHex(signedAuthorization)) {
    return new Response('Invalid request data', {
      status: 400,
    });
  }

  const privateKey = keccak256(
    encodePacked(['string', 'bytes'], [SECRET_SALT, signedAuthorization]),
  );
  const response: CreateXrpLinkedSignerResponse = {
    linkedSignerPrivateKey: privateKey,
  };

  return Response.json(response);
}
