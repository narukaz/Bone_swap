import React from "react";

function Footer() {
  return (
    <footer class="bg-white w-full text-gray-700 border-t border-gray-200 select-none">
      <div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* <!-- Company --> */}
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase">Company</h3>
          <ul class="space-y-1 text-sm">
            <li>
              <a href="/about" class="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/careers" class="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" class="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Products --> */}
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase">Products</h3>
          <ul class="space-y-1 text-sm">
            <li>
              <a href="/swap" class="hover:underline">
                Swap
              </a>
            </li>
            <li>
              <a href="/liquidity" class="hover:underline">
                Liquidity
              </a>
            </li>
            <li>
              <a href="/token-list" class="hover:underline">
                Token List
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Support --> */}
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase">Support</h3>
          <ul class="space-y-1 text-sm">
            <li>
              <a href="/help" class="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="/faq" class="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" class="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Social --> */}
        <div class="space-y-2">
          <h3 class="text-sm font-semibold uppercase">Follow Us</h3>
          <div class="flex space-x-4">
            <a
              href="https://twitter.com/CrazySwap"
              aria-label="Twitter"
              class="hover:text-gray-900"
            >
              <i data-lucide="twitter" class="w-5 h-5"></i>
            </a>
            <a
              href="https://github.com/CrazySwap"
              aria-label="GitHub"
              class="hover:text-gray-900"
            >
              <i data-lucide="github" class="w-5 h-5"></i>
            </a>
            <a
              href="https://linkedin.com/company/CrazySwap"
              aria-label="LinkedIn"
              class="hover:text-gray-900"
            >
              <i data-lucide="linkedin" class="w-5 h-5"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center text-xs text-gray-500 border-t border-gray-200 py-4">
        <p>© 2025 Crazy Swap, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
