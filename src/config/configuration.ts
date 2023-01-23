export default () => ({
  bcrypt: {
    rounds: 10,
  },
  jwt: {
    // TODO: base64 encode the key
    secret:
      'Z6LIztxtDk7XEPiAdRqjcaBdSJhspDALoZnlG8pe2xmdjvXRr82eIFzy_oou93ryDqxGacN7_BSMhXXQ37Tuu7kBSRkPerbwsYCSf3dOhKWm-zmcIihVxmOp1jbZnKDq8-r67WrWLFTNCHhPCYv0xF8AOSVHEPubr1EONlwMF_b1Lf0jOXiMYFdUzMbwe9bGqGNBlx51cXhmKLmGjJJX56T-phIQfBXia2fxzJ8TY8tg3lKuRtBtumSOfnvUXIv5GlVLfM6txcPO2lx8SC8bmxNxcI-QDtZR6xUDHngSOMP-1Cfd6bBNS-KNMPZGaT7uh-hlUK-1E30FP5zmAdCSZg', // TODO: this needs to come from a secret manager; not from code repo
    expiresIn: '900s', // setting a bit higher value for testing; should be very low (120s) for prod and high (7d) for refresh token instead
    algorithm: 'HS512',
  },
});
