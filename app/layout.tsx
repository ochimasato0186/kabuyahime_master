import type { ReactNode } from 'react';

export const metadata = {
	title: '株姫',
	description: '株姫の管理コンソール',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
