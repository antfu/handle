export const pinyinInitials = 'b p m f d t n l g k h j q r x w y zh ch sh z c s'.split(/\s/g)

export const pinyinFinals = 'a o e ai ei ao ou an en ang eng ong er i ia io ie iao iu ian in iang ing iong u ua uo ue uai ui uan un uang v ve van vn'
  .split(/\s/g)
  .sort((a, b) => {
    const i = a.length - b.length
    return a.localeCompare(b)
    return i
  })
