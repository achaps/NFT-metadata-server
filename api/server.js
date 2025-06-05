const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Collections data
const collections = {
  pandas: {
    name: "DB Pandas",
    description: "Collection exclusive de pandas du Doge Museum sur Laika Chain",
    totalSupply: 100
  },
  bears: {
    name: "DB Bears", 
    description: "Collection exclusive d'ours du Doge Museum sur Laika Chain",
    totalSupply: 100
  }
};

// Health check
app.get('/', (req, res) => {
  res.json({
    name: "Doge Museum Metadata Server",
    description: "NFT Metadata API for Laika Chain",
    version: "1.0.0",
    endpoints: {
      pandas: "/api/pandas/:tokenId",
      bears: "/api/bears/:tokenId"
    },
    chain: "Laika Chain (6942)",
    status: "active"
  });
});

// Pandas collection metadata
app.get('/api/pandas/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  const tokenIdNum = parseInt(tokenId);
  
  if (isNaN(tokenIdNum) || tokenIdNum < 0 || tokenIdNum >= collections.pandas.totalSupply) {
    return res.status(404).json({ error: 'Token not found' });
  }

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  const colors = ['Black & White', 'Brown', 'Golden', 'Silver', 'Rainbow'];
  
  // Generate deterministic attributes based on tokenId
  const rarity = rarities[tokenIdNum % rarities.length];
  const color = colors[tokenIdNum % colors.length];
  const level = Math.floor((tokenIdNum % 50) + 1);

  // Display tokenId as 1-based (tokenId 0 shows as #1)
  const displayTokenId = tokenIdNum + 1;

  const metadata = {
    name: `${collections.pandas.name} #${displayTokenId}`,
    description: `Un panda unique de la collection ${collections.pandas.name}. ${collections.pandas.description}`,
    image: `https://api.dicebear.com/7.x/bottts/svg?seed=panda${tokenId}&backgroundColor=00acc1,039be5,1e88e5,3949ab,5e35b1,8e24aa,d81b60,e53935,fb8c00,ff9800`,
    external_url: `https://dogemuseum.xyz/nft/pandas/${tokenId}`,
    attributes: [
      {
        trait_type: "Collection",
        value: collections.pandas.name
      },
      {
        trait_type: "Rarity", 
        value: rarity
      },
      {
        trait_type: "Color",
        value: color
      },
      {
        trait_type: "Level",
        value: level,
        display_type: "number"
      },
      {
        trait_type: "Token ID",
        value: tokenIdNum,
        display_type: "number"
      }
    ]
  };

  res.json(metadata);
});

// Bears collection metadata  
app.get('/api/bears/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  const tokenIdNum = parseInt(tokenId);
  
  if (isNaN(tokenIdNum) || tokenIdNum < 0 || tokenIdNum >= collections.bears.totalSupply) {
    return res.status(404).json({ error: 'Token not found' });
  }

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  const colors = ['Brown', 'Black', 'Grizzly', 'Polar', 'Golden'];
  
  // Generate deterministic attributes based on tokenId
  const rarity = rarities[tokenIdNum % rarities.length];
  const color = colors[tokenIdNum % colors.length];
  const level = Math.floor((tokenIdNum % 50) + 1);

  // Display tokenId as 1-based (tokenId 0 shows as #1)
  const displayTokenId = tokenIdNum + 1;

  const metadata = {
    name: `${collections.bears.name} #${displayTokenId}`,
    description: `Un ours unique de la collection ${collections.bears.name}. ${collections.bears.description}`,
    image: `https://api.dicebear.com/7.x/bottts/svg?seed=bear${tokenId}&backgroundColor=795548,8d6e63,a1887f,bcaaa4,d7ccc8,efebe9,3e2723,5d4037,6d4c41,8d6e63`,
    external_url: `https://dogemuseum.xyz/nft/bears/${tokenId}`,
    attributes: [
      {
        trait_type: "Collection",
        value: collections.bears.name
      },
      {
        trait_type: "Rarity",
        value: rarity
      },
      {
        trait_type: "Color", 
        value: color
      },
      {
        trait_type: "Level",
        value: level,
        display_type: "number"
      },
      {
        trait_type: "Token ID",
        value: tokenIdNum,
        display_type: "number"
      }
    ]
  };

  res.json(metadata);
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Doge Museum Metadata Server running on port ${PORT}`);
  console.log(`📡 Serving NFT metadata for Laika Chain`);
  console.log(`🐼 Pandas: /api/pandas/:tokenId`);
  console.log(`🐻 Bears: /api/bears/:tokenId`);
}); 