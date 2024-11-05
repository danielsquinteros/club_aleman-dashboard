const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['@node-rs/argon2'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				pathname: '**',
			},
		],
	},
};

module.exports = nextConfig;
