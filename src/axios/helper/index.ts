import { useStorage } from "@/hooks/useStorage"

const { getStorage } = useStorage()

export function getToken(): string | undefined {
  return getStorage("token")
}
