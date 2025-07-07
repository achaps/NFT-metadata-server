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
    name: "DM Pandas",
    description: "Pandas on Doge Museum",
    totalSupply: 1000
  },
  bears: {
    name: "DM Bears", 
    description: "Bears on Doge Museum",
    totalSupply: 1000
  },
  cats: {
    name: "DogeCatz",
    description: "Catz on Doge Museum",
    totalSupply: 10
  }
};

// Health check
app.get('/', (req, res) => {
  res.json({
    name: "Doge Museum Metadata Server",
    description: "NFT Metadata API for Holesky Chain",
    version: "1.0.0",
    endpoints: {
      pandas: "/api/pandas/:tokenId",
      pandasContract: "/api/pandas/contract",
      bears: "/api/bears/:tokenId",
      bearsContract: "/api/bears/contract",
      cats: "/api/cats/:tokenId",
      catsContract: "/api/cats/contract"
    },
    chain: "Holesky Chain (17000)",
    status: "active"
  });
});

// Pandas collection contract metadata
app.get('/api/pandas/contract', (req, res) => {
  const contractMetadata = {
    name: collections.pandas.name,
    description: collections.pandas.description,
    image: `https://img.over-blog-kiwi.com/3/05/63/84/20190311/ob_2f3c96_l2p-1-1-1.png`,
    external_link: `https://doge.museum`,
    seller_fee_basis_points: 500,
    fee_recipient: "0x79ED688442cf445Cb6137196BB21bbDAACaE79D2"
  };
  res.json(contractMetadata);
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
    description: `Unique Panda from ${collections.pandas.name}. ${collections.pandas.description}`,
    image: `https://img.over-blog-kiwi.com/3/05/63/84/20190311/ob_2f3c96_l2p-1-1-1.png`,
    external_url: `https://doge.museum/nft/pandas/${tokenId}`,
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

// Bears collection contract metadata
app.get('/api/bears/contract', (req, res) => {
  const contractMetadata = {
    name: "DM Bears",
    description: "Bears on Doge Museum",
    image: `https://i.ytimg.com/vi/DDY2nK9ugEI/maxresdefault.jpg`,
    external_link: `https://doge.museum`,
    seller_fee_basis_points: 500,
    fee_recipient: "0x79ED688442cf445Cb6137196BB21bbDAACaE79D2"
  };
  res.json(contractMetadata);
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
    description: `Unique Bear from ${collections.bears.name}. ${collections.bears.description}`,
    image: `https://i.ytimg.com/vi/DDY2nK9ugEI/maxresdefault.jpg`,
    external_url: `https://doge.museum/nft/bears/${tokenId}`,
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

// Cats collection contract metadata
app.get('/api/cats/contract', (req, res) => {
  const contractMetadata = {
    name: collections.cats.name,
    description: collections.cats.description,
    image: `https://i.pinimg.com/originals/b8/87/7c/b8877c4c0a5f6e5b6f7e8b5a3c4d2e1f.jpg`,
    external_link: `https://doge.museum`,
    seller_fee_basis_points: 500,
    fee_recipient: "0x79ED688442cf445Cb6137196BB21bbDAACaE79D2"
  };
  res.json(contractMetadata);
});

// Cats collection metadata  
app.get('/api/cats/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  const tokenIdNum = parseInt(tokenId);
  
  if (isNaN(tokenIdNum) || tokenIdNum < 0 || tokenIdNum >= collections.cats.totalSupply) {
    return res.status(404).json({ error: 'Token not found' });
  }

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  const colors = ['Orange', 'Black', 'White', 'Tabby', 'Calico'];
  
  // Generate deterministic attributes based on tokenId
  const rarity = rarities[tokenIdNum % rarities.length];
  const color = colors[tokenIdNum % colors.length];
  const level = Math.floor((tokenIdNum % 50) + 1);

  // Display tokenId as 1-based (tokenId 0 shows as #1)
  const displayTokenId = tokenIdNum + 1;

  const metadata = {
    name: `${collections.cats.name} #${displayTokenId}`,
    description: `Unique Cat from ${collections.cats.name}. ${collections.cats.description}`,
    image: `https://i.pinimg.com/originals/b8/87/7c/b8877c4c0a5f6e5b6f7e8b5a3c4d2e1f.jpg`,
    external_url: `https://doge.museum/nft/cats/${tokenId}`,
    attributes: [
      {
        trait_type: "Collection",
        value: collections.cats.name
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
  console.log(`📡 Serving NFT metadata for Holesky Chain`);
  console.log(`🐼 Pandas: /api/pandas/:tokenId`);
  console.log(`🐼 Pandas Contract: /api/pandas/contract`);
  console.log(`🐻 Bears: /api/bears/:tokenId`);
  console.log(`🐻 Bears Contract: /api/bears/contract`);
  console.log(`🐱 Cats: /api/cats/:tokenId`);
  console.log(`🐱 Cats Contract: /api/cats/contract`);
}); 