import { Contract } from 'ethers'

export const getContract = (
  library: any,
  account: any,
  address: string,
  abi: any,
): Contract => {
  const signer = library.getSigner(account).connectUnchecked()
  return new Contract(address, abi, signer)
}
