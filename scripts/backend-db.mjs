import { execFileSync, spawnSync } from 'node:child_process'

const server = 'oracle_arm'
const container = 'redmarathon-backend-5dygcy-postgres-1'
const localPort = 15433
const sshOptions = ['-T', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10']

try {
  // Resolve the private Docker address again each time: redeploys can change it.
  const output = execFileSync(
    'ssh',
    [
      ...sshOptions,
      server,
      `docker inspect --format '{{json .NetworkSettings.Networks}}' ${container}`
    ],
    { encoding: 'utf8', timeout: 15000, stdio: ['ignore', 'pipe', 'inherit'] }
  )
  const networks = JSON.parse(output)
  const address = networks['redmarathon-backend-5dygcy_default']?.IPAddress
  if (!address || !/^\d{1,3}(\.\d{1,3}){3}$/.test(address)) {
    new Error('PostgreSQL has no IPv4 address in its private Docker network.')
  }

  console.log(`API tunnel: 192.168.0.14:4000 -> ${server} -> 127.0.0.1:14000`)
  console.log(
    `PostgreSQL tunnel: 127.0.0.1:${localPort} -> ${server} -> ${address}:5432`
  )
  console.log(
    'WebStorm: database red_marathon, user red_marathon. Stop with Ctrl+C.'
  )
  const result = spawnSync(
    'ssh',
    [
      ...sshOptions,
      '-N',
      '-o',
      'ExitOnForwardFailure=yes',
      '-o',
      'ServerAliveInterval=30',
      '-o',
      'ServerAliveCountMax=3',
      '-L',
      '192.168.0.14:4000:127.0.0.1:14000',
      '-L',
      `127.0.0.1:${localPort}:${address}:5432`,
      server
    ],
    { stdio: 'inherit' }
  )
  if (result.error) result.error
  process.exitCode = result.status ?? 1
} catch (error) {
  console.error(`Cannot open backend tunnel: ${error.message}`)
  process.exitCode = 1
}
