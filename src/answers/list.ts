/**
 * SPOILERS
 *
 * This file contains the list of answers for the game. It's not recommended to continue reading this file.
 *
 * 剧透警告
 *
 * 该文件包含了游戏的答案列表。不建议继续阅读。
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import { seedShuffle } from './utils'

function prepare<T>(len: number, arr: T[]) {
  if (arr.length !== len)
    throw new Error(`expect array length ${arr.length} to be ${len}`)
  return arr
}

export const _PRE = prepare(1, [[]])

export const _2022_JAN = prepare(31, [
  ...Array.from({ length: 28 }, () => []),
  ['天南海北'],
  ['地动山摇'],
  ['福寿安康'],
])

export const _2022_FEB = prepare(28, [
  ['虎虎生威', '虎'],
  ['酒虎诗龙', '虎'],
  ['虎啸风生', '虎'],
  ['卧虎藏龙', '虎'],
  ['虎视眈眈', '虎'],
  ...seedShuffle([
    ['春华秋实'],
    ['一面之辞'],
    ['变化莫测'],
    ['穷山恶水'],
    ['百废待兴'],
    ['百年树人'],
    ['吃里扒外'],
    ['井然有条'],
    ['本性难移'],
    ['不破不立'],
    ['雄心勃勃'],
    ['各有千秋'],
    ['异口同声'],
    ['因噎废食'],
    ['惊世骇俗'],
    ['同甘共苦'],
    ['见风使舵'],
    ['地北天南'],
    ['日久天长'],
    ['应对如流'],
    ['欣然自得'],
    ['瓜田李下'],
    ['语不投机'],
  ], '2022-02'),
])

export const _2022_MARCH = prepare(31, seedShuffle([
  ['孜孜不倦', '不'],
  ['胆战心惊'],
  ['本性难移'],
  ['敬天爱民'],
  ['行尸走肉'],
  ['延年益寿'],
  ['轻声细语'],
  ['格格不入'],
  ['拐弯抹角'],
  ['扑朔迷离'],
  ['断垣残壁'],
  ['一无所获'],
  ['肤若凝脂'],
  ['千姿百态'],
  ['惟妙惟肖'],
  ['苦口婆心'],
  ['独树一帜'],
  ['走马观花'],
  ['烧眉之急'],
  ['不翼而飞'],
  ['不言而喻'],
  ['历历在目', '在'],
  ['分身乏术', '分'],
  ['高深莫测'],
  ['小人得志'],
  ['螳臂当车', '车'],
  ['鬼斧神工'],
  ['无中生有'],
  ['自求多福'],
  ['坐吃山空'],
  ['愤世嫉俗'],
], '2022-03'))

export const answers: string[][] = [
  ..._PRE,
  ..._2022_JAN,
  ..._2022_FEB,
  ..._2022_MARCH,
]
