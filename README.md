# 🎨 Doge Museum Metadata Server

NFT Metadata API server for **Doge Museum** on **Laika Chain**.

## 🚀 Deployed on Vercel

This server provides ERC721-compliant metadata for NFT collections:

- **🐼 DB Pandas**: `/api/pandas/:tokenId`  
- **🐻 DB Bears**: `/api/bears/:tokenId`

## 📡 API Endpoints

### Root
```
GET /
```
Returns server information and available endpoints.

### Pandas Collection
```
GET /api/pandas/:tokenId
```
Returns metadata for Pandas collection (tokenId 1-100).

### Bears Collection  
```
GET /api/bears/:tokenId
```
Returns metadata for Bears collection (tokenId 1-100).

## 📋 Metadata Format

Standard ERC721 metadata format:
```json
{
  "name": "DB Pandas #1",
  "description": "Un panda unique de la collection DB Pandas...",
  "image": "https://api.dicebear.com/7.x/bottts/svg?seed=panda1&...",
  "external_url": "https://dogemuseum.xyz/nft/pandas/1",
  "attributes": [
    {
      "trait_type": "Collection",
      "value": "DB Pandas"
    },
    {
      "trait_type": "Rarity",
      "value": "Rare"
    }
  ]
}
```

## 🛠 Tech Stack

- **Node.js** + **Express**
- **CORS** enabled
- **Vercel** deployment
- **Deterministic** attribute generation

## 🌐 Laika Chain Integration

- **Chain ID**: 6942
- **Currency**: DOGE
- **Contract**: 0x79ED688442cf445Cb6137196BB21bbDAACaE79D2

---

Built for **Doge Museum** NFT Marketplace 🏛️ 
