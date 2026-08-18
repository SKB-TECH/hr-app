export function mediaUrl(value?: string | null, fallback = "/logo/lgo.png") {
  if (!value) return fallback;
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;
  const filesIndex = value.indexOf("/files/");
  return filesIndex >= 0
    ? `/api/files/${value.slice(filesIndex + "/files/".length)}`
    : value;
}
