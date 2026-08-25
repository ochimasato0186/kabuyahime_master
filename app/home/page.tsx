'use client';

import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

const gachas = [
	{
		id: 1,
		name: '株や姫スタートアップ',
		many: 1,
		startAt: '2026-08-01T12:00:00+09:00',
		endAt: '2026-09-01T11:59:00+09:00',
		contents: [
			{ name: 'つばきの晴れ着', rarity: 'SSR', rate: '0.5000%', color: 'coral' },
			{ name: 'ネオンシティ', rarity: 'SR', rate: '4.5000%', color: 'gold' },
			{ name: 'ガチャチケット', rarity: 'R', rate: '95.0000%', color: 'mint' },
		],
	},
	{
		id: 2,
		name: 'サマーフェスティバル',
		many: 5,
		startAt: '2026-07-01T12:00:00+09:00',
		endAt: '2026-08-01T11:59:00+09:00',
		contents: [],
	},
];

const now = new Date('2026-08-25T15:30:00+09:00');
const activeGachas = gachas.filter((gacha) => new Date(gacha.startAt) <= now && now <= new Date(gacha.endAt));

function formatDate(value: string) {
	return new Intl.DateTimeFormat('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}

export default function HomePage() {
	return (
		<main className="home-shell">
			<header className="topbar">
				<Link className="brand" href="/home"><span className="brand-mark">K</span><span>株姫</span></Link>
				<div className="top-context"><span className="context-dot" />ガチャマスタ管理</div>
				<div className="top-actions"><span className="api-status"><span />API同期済み</span><span className="avatar">MS</span></div>
			</header>
			<div className="page-layout">
				<Sidebar activePage="home" activeGachaCount={activeGachas.length} />
				<section className="content">
					<div className="breadcrumb">HOME <span>/</span> 開催状況</div>
					<div className="content-header"><div><p className="eyebrow">TODAY&apos;S GACHAS</p><h1>開催中のガチャ</h1><p className="muted">現在の日時点で開催期間内にあるガチャを表示しています。</p></div><Link className="secondary-button" href="/master">マスタを管理する <span>→</span></Link></div>
					<div className="status-strip"><span className="live-dot" /><strong>{activeGachas.length}件</strong><span>現在開催中</span><time>2026年8月25日 15:30 JST</time></div>
					{activeGachas.length > 0 ? <div className="gacha-grid">{activeGachas.map((gacha) => <article className="gacha-card" key={gacha.id}><div className="card-top"><span className="live-badge"><span />開催中</span><span className="gacha-id">ID: {gacha.id}</span></div><h2>{gacha.name}</h2><div className="period"><span>開催期間</span><strong>{formatDate(gacha.startAt)} - {formatDate(gacha.endAt)}</strong></div><div className="coin-cost"><span>1回分の必要硬貨</span><strong>{gacha.many}枚</strong></div><div className="card-divider" /><div className="card-heading"><span>主な排出内容</span><Link href="/master">詳細を見る →</Link></div><ul className="content-list">{gacha.contents.map((content) => <li key={content.name}><span className={`item-icon ${content.color}`}>{content.rarity}</span><span className="item-name">{content.name}</span><strong>{content.rate}</strong></li>)}</ul><Link className="manage-link" href="/master">排出設定を確認する <span>↗</span></Link></article>)}</div> : <div className="empty-state"><strong>現在開催中のガチャはありません</strong><span>ガチャマスタで開催期間を確認してください。</span></div>}
				</section>
			</div>
			<style jsx>{`
	:global(*) { box-sizing: border-box; }
	:global(body) { margin: 0; background: #f5f7f6; color: #18322f; font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif; }
	.home-shell { min-height: 100vh; background: radial-gradient(circle at 84% 2%, #e8f1ed 0, transparent 35%), linear-gradient(135deg, #f5f7f6 0%, #fbfcfb 52%, #eef5f1 100%); }.home-shell::before { content: ''; position: fixed; inset: 76px 0 0; pointer-events: none; opacity: .24; background-image: linear-gradient(#dce8e3 1px, transparent 1px), linear-gradient(90deg, #dce8e3 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, #000, transparent 72%); }
	.topbar { height: 76px; padding: 0 38px; display: flex; align-items: center; gap: 40px; position: relative; z-index: 2; background: #fbfdfc; border-bottom: 1px solid #dce7e2; }.brand { display: flex; align-items: center; gap: 10px; color: #183b38; font: 700 25px Georgia, serif; text-decoration: none; letter-spacing: .04em; }.brand-mark { display: grid; place-items: center; width: 30px; height: 30px; color: #fff; background: #1c7770; border-radius: 50%; font: 700 16px Georgia, serif; }.top-context { padding-left: 28px; border-left: 1px solid #e5ece9; color: #71817d; font-size: 12px; }.context-dot { display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 50%; background: #de9567; }.top-actions { display: flex; align-items: center; gap: 18px; margin-left: auto; }.api-status { color: #7b8d87; font-size: 11px; }.api-status span { display: inline-block; width: 7px; height: 7px; margin-right: 7px; border-radius: 50%; background: #43a67e; }.avatar { display: grid; place-items: center; width: 32px; height: 32px; color: #fff; background: #bc8061; border-radius: 50%; font-size: 11px; }
	.page-layout { display: flex; min-height: calc(100vh - 76px); }.sidebar { position: relative; z-index: 1; width: 244px; flex-shrink: 0; padding: 34px 18px; background: #fff; border-right: 1px solid #e1e9e5; }.workspace-label { padding: 0 13px 12px; color: #95a4a1; font-size: 10px; font-weight: 700; letter-spacing: .13em; }.nav-item { display: flex; align-items: center; gap: 13px; height: 43px; padding: 0 13px; color: #647370; border-left: 3px solid transparent; font-size: 13px; text-decoration: none; }.nav-item.active, .nav-item:hover { color: #16665f; background: #eef7f3; border-left-color: #208b7d; font-weight: 700; }.nav-icon { width: 18px; text-align: center; font: 18px Georgia, serif; }.sidebar-note { display: flex; flex-direction: column; gap: 7px; margin: 34px 4px 0; padding: 16px; background: #f2f7f4; border: 1px solid #dfebe5; }.note-label { color: #9baaa5; font-size: 9px; font-weight: 700; letter-spacing: .13em; }.sidebar-note strong { color: #2a5149; font: 600 14px Georgia, serif; }.sidebar-note span:last-child { color: #23806f; font: 700 20px Georgia, serif; }
	.content { position: relative; z-index: 1; width: 100%; max-width: 1180px; margin: 0 auto; padding: 48px 6% 80px; }.breadcrumb { margin-bottom: 36px; color: #94a19f; font-size: 10px; letter-spacing: .1em; }.breadcrumb span { margin: 0 10px; color: #c3ceca; }.content-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }.eyebrow { margin: 0 0 10px; color: #95a4a1; font-size: 10px; font-weight: 700; letter-spacing: .13em; }.content h1 { margin: 0 0 9px; color: #173936; font: 600 clamp(29px, 4vw, 44px) Georgia, serif; }.muted { margin: 0; color: #82918e; font-size: 13px; }.secondary-button { padding: 11px 15px; color: #276c63; border: 1px solid #9bb5ad; border-radius: 4px; font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; }.secondary-button:hover { background: #eef7f3; }.secondary-button span { margin-left: 8px; font-size: 16px; }.status-strip { display: flex; align-items: center; gap: 9px; margin-bottom: 18px; padding: 13px 16px; color: #6e817b; background: #eaf4ef; border: 1px solid #d9e9e1; font-size: 12px; }.status-strip strong { color: #176a61; font: 700 18px Georgia, serif; }.status-strip time { margin-left: auto; color: #93a19d; font-size: 10px; }.live-dot, .live-badge span { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #43a67e; }.gacha-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; }.gacha-card { padding: 27px 30px 24px; background: rgba(255, 255, 255, .94); border: 1px solid #dce7e2; box-shadow: 0 14px 30px #31584b0d; }.card-top, .card-heading, .period { display: flex; align-items: center; justify-content: space-between; }.live-badge { display: inline-flex; align-items: center; gap: 7px; padding: 5px 9px; color: #277665; background: #e5f4ec; font-size: 10px; font-weight: 700; }.gacha-id { color: #a1adaa; font: 11px Consolas, monospace; }.gacha-card h2 { margin: 19px 0 22px; color: #1a3e38; font: 600 30px Georgia, serif; }.period { justify-content: flex-start; gap: 20px; color: #94a19d; font-size: 11px; }.period strong { color: #526d66; font: 13px Consolas, monospace; }.card-divider { height: 1px; margin: 25px 0 18px; background: #e7efeb; }.card-heading { color: #6b7e78; font-size: 11px; }.card-heading a { color: #318274; text-decoration: none; }.content-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 0; margin: 13px 0 22px; list-style: none; }.content-list li { display: grid; grid-template-columns: 32px 1fr; grid-template-rows: auto auto; column-gap: 10px; padding: 13px; background: #f6f9f7; border: 1px solid #e6efea; }.item-icon { grid-row: span 2; display: grid; place-items: center; width: 32px; height: 32px; color: #fff; font: 700 10px Georgia, serif; border-radius: 50%; }.item-icon.coral { background: #d78c6d; }.item-icon.gold { background: #c3a05d; }.item-icon.mint { background: #65a88d; }.item-name { align-self: end; color: #526a64; font-size: 11px; }.content-list li strong { align-self: start; color: #b97859; font: 11px Consolas, monospace; }.manage-link { display: block; padding-top: 16px; color: #287b6e; border-top: 1px solid #e7efeb; font-size: 11px; font-weight: 700; text-decoration: none; }.manage-link span { float: right; font-size: 15px; }.empty-state { display: flex; flex-direction: column; gap: 9px; align-items: center; padding: 70px 20px; background: #fff; border: 1px solid #dce7e2; color: #879591; font-size: 12px; }.empty-state strong { color: #536d65; font: 600 20px Georgia, serif; }
	@media (max-width: 760px) { .topbar { padding: 0 20px; gap: 18px; }.top-context, .api-status { display: none; }.page-layout { display: block; }.sidebar { width: 100%; padding: 15px 20px; border-right: 0; border-bottom: 1px solid #e1e9e5; }.workspace-label, .sidebar-note { display: none; }.sidebar nav { display: flex; gap: 4px; }.nav-item { flex: 1; justify-content: center; }.content { padding: 30px 20px 55px; }.content-header { align-items: flex-start; flex-direction: column; }.content-header .secondary-button { align-self: stretch; text-align: center; }.content-list { grid-template-columns: 1fr; }.gacha-card { padding: 22px 18px; }.gacha-card h2 { font-size: 25px; }.period { align-items: flex-start; flex-direction: column; gap: 6px; }.status-strip time { display: none; } }
`}</style>
		</main>
	);
}
