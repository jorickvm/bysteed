// Draws the homepage link preview from the app icons:
//   swift scripts/build_og_home.swift . assets/og/home.png
import AppKit

let root = CommandLine.arguments[1]
let out = CommandLine.arguments[2]
let W = 1200, H = 630
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H, bitsPerSample: 8,
                           samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                           colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
rep.size = NSSize(width: W, height: H)
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

func hex(_ v: Int) -> NSColor {
    NSColor(srgbRed: CGFloat((v >> 16) & 255) / 255, green: CGFloat((v >> 8) & 255) / 255,
            blue: CGFloat(v & 255) / 255, alpha: 1)
}

hex(0xfafaf8).setFill()
NSRect(x: 0, y: 0, width: W, height: H).fill()

let size: CGFloat = 192, gap: CGFloat = 56
let icons = ["atlasdays", "shift", "stallion"]
let rowW = size * 3 + gap * 2
let top: CGFloat = 150
for (i, name) in icons.enumerated() {
    let img = NSImage(contentsOfFile: "\(root)/assets/icons/\(name).png")!
    let r = NSRect(x: (CGFloat(W) - rowW) / 2 + CGFloat(i) * (size + gap), y: CGFloat(H) - top - size,
                   width: size, height: size)
    let path = NSBezierPath(roundedRect: r, xRadius: 43, yRadius: 43)
    NSGraphicsContext.saveGraphicsState()
    path.addClip()
    img.draw(in: r)
    NSGraphicsContext.restoreGraphicsState()
    hex(0xe5e5e2).setStroke()
    path.lineWidth = 2
    path.stroke()
}

func text(_ s: String, _ font: NSFont, _ color: NSColor, top: CGFloat) {
    let a = NSAttributedString(string: s, attributes: [.font: font, .foregroundColor: color, .kern: font.pointSize * -0.02])
    let sz = a.size()
    a.draw(at: NSPoint(x: (CGFloat(W) - sz.width) / 2, y: CGFloat(H) - top - sz.height))
}
text("Apps by Steed", .systemFont(ofSize: 76, weight: .bold), hex(0x1c1c1e), top: 394)

NSGraphicsContext.current = nil
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
