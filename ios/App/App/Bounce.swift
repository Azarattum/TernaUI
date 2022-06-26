import Capacitor

@objc(BouncePlugin)
public class BouncePlugin: CAPPlugin {
    @objc override public func load() {
        self.bridge?.webView?.scrollView.bounces = true
    }
}
