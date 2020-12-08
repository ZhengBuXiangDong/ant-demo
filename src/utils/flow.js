const RIGHT_ARROW = -Math.PI / 180 * 90
const LEFT_ARROW = Math.PI / 180 * 90
const UP_ARROW = Math.PI
const DOWN_ARROW = Math.PI / 180

const NORMAL_COLOR = '#DCDEE5'
const ACTIVE_COLOR = '#6997FF'
const NORMAL_PREFIX = 'normal'
const ACTIVE_PREFIX = 'active'
const NORMAL_LINE_WIDTH = 1
const ACTIVE_LINE_WIDTH = 2

let nodeMap = new Map()
let widthNumber = 0
let ctx = null

function draw () {
    nodeMap = this.nodeMap
    widthNumber = this.widthNumber
    this.flow.forEach((node) => {
        drawNormalNode(node)
        drawActiveNode(node)
    })
}

function drawNormalNode (node) {
    drawInit(node, NORMAL_PREFIX)
    doDraw(node)
}

function drawActiveNode (node) {
    drawInit(node, ACTIVE_PREFIX)
    doDraw(node)
}

function drawInit (node, prefix) {
    const canvas = document.getElementById(prefix + node.index)
    ctx = canvas.getContext('2d')
    const y = 20 + node.index * 85
    const x = widthNumber / 2 + (node.index % 2 === 0 ? 85 : -85)
    ctx.strokeStyle = prefix === NORMAL_PREFIX ? NORMAL_COLOR : ACTIVE_COLOR
    ctx.fillStyle = prefix === NORMAL_PREFIX ? NORMAL_COLOR : ACTIVE_COLOR
    ctx.lineWidth = prefix === NORMAL_PREFIX ? NORMAL_LINE_WIDTH : ACTIVE_LINE_WIDTH
    ctx.translate(x, y)
    ctx.save()
}

function doDraw (node) {
    node.nextNode.forEach((nextId) => {
        const nextNode = nodeMap.get(nextId)
        const diff = node.index - nextNode.index
        if (Math.abs(diff) === 1) {
            connect2Up(node, diff < 0)
        } else if (diff < 0) {
            downDraw(node, nextNode)
        } else {
            upDraw(node, nextNode)
        }
    })
}

function connect2Up (node, down) {
    const x = node.derection ? -85 : 85
    let y = -20
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y)
    y = down ? 65 : -65
    ctx.lineTo(x, y)
    ctx.stroke()
    drawArrow(x, y, down ? DOWN_ARROW : UP_ARROW)
}

function downDraw (node, targetNode) {
    let x = 0
    let y = 0
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y)
    x = ((node.derection ? targetNode.rightOrder : targetNode.leftOrder) * 40 + 80) * (node.derection ? 1 : -1)
    ctx.lineTo(x, y)
    y = (targetNode.index - node.index) * 85
    ctx.lineTo(x, y)
    x = 0
    ctx.lineTo(x, y)
    ctx.stroke()
    drawArrow(x, y, node.derection ? LEFT_ARROW : RIGHT_ARROW)
}

function upDraw (node, targetNode) {
    let x = 0
    let y = 0
    ctx.save()
    if (node.derection !== targetNode.derection) {
        x = node.derection ? x - 169 : x + 169
    }
    ctx.beginPath()
    ctx.translate(x, y)
    x = 0
    ctx.moveTo(x, y)
    x = ((targetNode.derection ? node.rightOrder : node.leftOrder) * 40 + 80) * (targetNode.derection ? 1 : -1)
    ctx.lineTo(x, y)
    y = (targetNode.index - node.index) * 85
    ctx.lineTo(x, y)
    x = 0
    ctx.lineTo(x, y)
    ctx.stroke()
    drawArrow(x, y, targetNode.derection ? LEFT_ARROW : RIGHT_ARROW)
}

function drawArrow (x, y, angle) {
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.lineTo(-5, -5)
    ctx.lineTo(5, -5)
    ctx.lineTo(0, 0)
    ctx.fill()
    ctx.restore()
}

export { draw }
