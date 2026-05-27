"""Legacy entrypoint kept only to avoid surprise broken references.

The rebuilt Gadget Goblin site is static and uses data/products.json.
This script intentionally does not fetch feeds, scrape Amazon, or append
affiliate IDs. Add products manually using CONTENT_WORKFLOW.md.
"""


def main():
    print("Gadget Goblin is now a static site.")
    print("Edit data/products.json and preview with: python -m http.server 8000")
    print("See CONTENT_WORKFLOW.md for the safe review publishing workflow.")


if __name__ == "__main__":
    main()
