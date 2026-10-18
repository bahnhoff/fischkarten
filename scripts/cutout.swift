// Stellt das Hauptmotiv eines Bildes frei und legt es auf weißen Hintergrund.
// Aufruf: swiftc -O scripts/cutout.swift -o /tmp/cutout && /tmp/cutout <eingabe> <ausgabe.jpg>
// Nutzt die Motiverkennung von macOS (Vision, ab macOS 14).
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count == 3 else { print("Aufruf: cutout <eingabe> <ausgabe.jpg>"); exit(2) }
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])

guard let src = CGImageSourceCreateWithURL(input as CFURL, nil),
      let cg = CGImageSourceCreateImageAtIndex(src, 0, nil) else { print("Bild nicht lesbar"); exit(1) }

let handler = VNImageRequestHandler(cgImage: cg)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { print("kein Motiv gefunden"); exit(1) }

// Alle erkannten Motive freistellen, auf ihren Umriss zugeschnitten
let masked = try result.generateMaskedImage(ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: true)
let fg = CIImage(cvPixelBuffer: masked)

// Weißer Rand von 3 % um das Motiv
let pad = max(fg.extent.width, fg.extent.height) * 0.03
let canvas = fg.extent.insetBy(dx: -pad, dy: -pad)
let white = CIImage(color: .white).cropped(to: canvas)
let composed = fg.composited(over: white)
    .transformed(by: CGAffineTransform(translationX: -canvas.minX, y: -canvas.minY))

let ctx = CIContext()
guard let out = ctx.createCGImage(composed, from: CGRect(origin: .zero, size: canvas.size)),
      let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.jpeg.identifier as CFString, 1, nil)
else { print("Ausgabe fehlgeschlagen"); exit(1) }
CGImageDestinationAddImage(dest, out, [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary)
CGImageDestinationFinalize(dest)
print("\(Int(canvas.width))x\(Int(canvas.height)) Motive: \(result.allInstances.count)")
