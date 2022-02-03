import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'

export async function exportImage(el: HTMLElement, filename: string) {
  const datauri = await toPng(el)
  saveAs(datauri, filename)
}

export { toPng }
