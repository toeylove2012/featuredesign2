interface IOptions {
  timeout: number;
}
export async function fetchWithTimeout(resource: any, options: IOptions): Promise<Response> {
  const { timeout = 1000 } = options;

  const controller = new AbortController();
  const action = setTimeout(() => controller.abort(), timeout);

  const response: Response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(action);

  return response;
}
