const rawPort = process.env.PORT;

const DEFAULT_PORT = 3000;

function resolvePort(value: string | undefined): number {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    console.warn(
      `Invalid PORT value "${value}" in environment. Falling back to default port ${DEFAULT_PORT}.`
    );
    return DEFAULT_PORT;
  }

  return parsed;
}

export const config = {
  port: resolvePort(rawPort),
};