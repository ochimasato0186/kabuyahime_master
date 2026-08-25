'use client';

import Link from 'next/link';

export type MasterKey = 'characters' | 'items' | 'gachas' | 'capsules' | 'gacha_contents';
type ActivePage = 'home' | 'master';

type SidebarProps = {
	activePage: ActivePage;
	activeMaster?: MasterKey;
	activeGachaCount?: number;
	onMasterSelect?: (key: MasterKey) => void;
};

const masterItems: { key: MasterKey; label: string }[] = [
	{ key: 'characters', label: 'キャラクター' },
	{ key: 'items', label: 'アイテム' },
	{ key: 'gachas', label: 'ガチャ' },
	{ key: 'capsules', label: 'カプセル' },
	{ key: 'gacha_contents', label: '排出内容' },
];

export default function Sidebar({ activePage, activeMaster, activeGachaCount = 0, onMasterSelect }: SidebarProps) {
	return (
		<aside className="shared-sidebar">
			<div className="shared-label">ガチャマスタ</div>
			<nav className="shared-primary-nav">
				<Link className={`shared-nav-item ${activePage === 'home' ? 'active' : ''}`} href="/home"><span className="shared-nav-icon">⌂</span><span>ホーム</span></Link>
				<Link className={`shared-nav-item ${activePage === 'master' ? 'active' : ''}`} href="/master"><span className="shared-nav-icon">◇</span><span>マスタ管理</span></Link>
				<Link className="shared-nav-item" href="/settings"><span className="shared-nav-icon">⚙</span><span>Firebase設定</span></Link>
			</nav>
			<div className="shared-divider" />
			<div className="shared-label">管理テーブル</div>
			<nav className="shared-master-nav">
				{masterItems.map((item) => onMasterSelect ? <button className={`shared-nav-item shared-nav-button ${activeMaster === item.key ? 'active' : ''}`} onClick={() => onMasterSelect(item.key)} key={item.key}><span className="shared-nav-icon">{item.key === 'gacha_contents' ? '↳' : '○'}</span><span>{item.label}</span></button> : <Link className="shared-nav-item" href="/master" key={item.key}><span className="shared-nav-icon">{item.key === 'gacha_contents' ? '↳' : '○'}</span><span>{item.label}</span></Link>)}
			</nav>
			{activePage === 'home' && <div className="shared-summary"><span>TODAY</span><strong>開催中のガチャ</strong><b>{activeGachaCount}件</b></div>}
			<div className="shared-sync"><span />API同期済み <small>2分前</small></div>
			<style jsx>{`
				:global(.shared-sidebar) { position: relative; z-index: 1; width: 244px; min-height: calc(100vh - 76px); flex-shrink: 0; display: flex; flex-direction: column; padding: 34px 18px 22px; background: #fff; border-right: 1px solid #e1e9e5; }
				:global(.shared-label) { padding: 0 13px 12px; color: #95a4a1; font-size: 10px; font-weight: 700; letter-spacing: .13em; }
				:global(.shared-primary-nav), :global(.shared-master-nav) { display: flex; flex-direction: column; gap: 2px; }
				:global(.shared-nav-item) { display: flex; align-items: center; gap: 13px; width: 100%; height: 43px; padding: 0 13px; color: #647370; border: 0; border-left: 3px solid transparent; background: transparent; font: 13px inherit; text-align: left; text-decoration: none; cursor: pointer; }
				:global(.shared-nav-item:hover), :global(.shared-nav-item.active) { color: #16665f; background: #eef7f3; border-left-color: #208b7d; font-weight: 700; }
				:global(.shared-nav-icon) { width: 18px; color: currentColor; text-align: center; font: 18px Georgia, serif; }
				:global(.shared-divider) { height: 1px; margin: 27px 13px 25px; background: #edf1f0; }
				:global(.shared-summary) { display: flex; flex-direction: column; gap: 7px; margin: 34px 4px 0; padding: 16px; background: #f2f7f4; border: 1px solid #dfebe5; }.shared-summary span { color: #9baaa5; font-size: 9px; font-weight: 700; letter-spacing: .13em; }.shared-summary strong { color: #2a5149; font: 600 14px Georgia, serif; }.shared-summary b { color: #23806f; font: 700 20px Georgia, serif; }
				:global(.shared-sync) { margin: auto 13px 0; color: #879591; font-size: 10px; }.shared-sync span { display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 50%; background: #43a67e; }.shared-sync small { display: block; margin: 6px 0 0 16px; color: #b0bbb8; }
				@media (max-width: 900px) { :global(.shared-sidebar) { position: fixed; top: 76px; bottom: 0; left: 0; z-index: 4; transform: translateX(-100%); transition: transform .2s ease; box-shadow: 10px 0 30px #183b3820; } :global(.sidebar-visible .shared-sidebar) { transform: translateX(0); } }
				@media (max-width: 760px) { :global(.shared-sidebar) { position: relative; top: auto; bottom: auto; width: 100%; min-height: auto; padding: 15px 20px; border-right: 0; border-bottom: 1px solid #e1e9e5; transform: none; box-shadow: none; } :global(.shared-label), :global(.shared-divider), :global(.shared-master-nav), :global(.shared-summary), :global(.shared-sync) { display: none; } :global(.shared-primary-nav) { flex-direction: row; gap: 4px; } :global(.shared-nav-item) { flex: 1; justify-content: center; } }
			`}</style>
		</aside>
	);
}
