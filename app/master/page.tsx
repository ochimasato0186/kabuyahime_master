'use client';

import { FormEvent, useMemo, useState } from 'react';
import Sidebar, { MasterKey } from '../../components/Sidebar';

type MasterDefinition = {
	key: MasterKey;
	label: string;
	description: string;
	columns: string[];
	rows: Record<string, string | number>[];
};

const definitions: MasterDefinition[] = [
	{
		key: 'characters',
		label: 'キャラクター',
		description: 'キャラクターの基本情報とUnityアセットを管理',
		columns: ['character_id', 'character_name', 'industry', 'asset_key', 'is_active'],
		rows: [
			{ character_id: 1, character_name: '株野 つばき', industry: '自動車', asset_key: 'character_tsubaki', is_active: 'true' },
			{ character_id: 2, character_name: '姫川 さくら', industry: 'テクノロジー', asset_key: 'character_sakura', is_active: 'true' },
			{ character_id: 3, character_name: '海堂 なぎさ', industry: '食品', asset_key: 'character_nagisa', is_active: 'false' },
		],
	},
	{
		key: 'items',
		label: 'アイテム',
		description: '衣装・背景・チケットなどの報酬アイテムを管理',
		columns: ['item_id', 'item_name', 'character_id', 'item_type', 'rarity', 'is_active'],
		rows: [
			{ item_id: 101, item_name: 'つばきの晴れ着', character_id: 1, item_type: '衣装', rarity: 'SSR', is_active: 'true' },
			{ item_id: 102, item_name: 'ネオンシティ', character_id: '-', item_type: '背景', rarity: 'SR', is_active: 'true' },
			{ item_id: 103, item_name: 'ガチャチケット', character_id: '-', item_type: 'チケット', rarity: 'R', is_active: 'true' },
		],
	},
	{
		key: 'gachas',
		label: 'ガチャ',
		description: '開催期間と公開状態を管理',
		columns: ['gacha_id', 'gacha_name', 'many', 'start_at', 'end_at', 'is_active'],
		rows: [
			{ gacha_id: 1, gacha_name: '株や姫スタートアップ', many: 1, start_at: '2026/08/01 12:00', end_at: '2026/09/01 11:59', is_active: 'true' },
			{ gacha_id: 2, gacha_name: 'サマーフェスティバル', many: 5, start_at: '2026/07/01 12:00', end_at: '2026/08/01 11:59', is_active: 'false' },
		],
	},
	{
		key: 'capsules',
		label: 'カプセル',
		description: '排出演出に使うカプセルとUnity素材を管理',
		columns: ['capsule_id', 'capsule_name', 'asset_key', 'description', 'is_active'],
		rows: [
			{ capsule_id: 1, capsule_name: '通常カプセル', asset_key: 'capsule_normal', description: '通常レアリティの演出', is_active: 'true' },
			{ capsule_id: 2, capsule_name: 'ゴールドカプセル', asset_key: 'capsule_gold', description: 'SR以上の演出', is_active: 'true' },
			{ capsule_id: 3, capsule_name: '地域限定カプセル', asset_key: 'capsule_local', description: '地域イベント用', is_active: 'false' },
		],
	},
	{
		key: 'gacha_contents',
		label: '排出内容',
		description: 'ガチャごとのアイテム、排出率、演出を設定',
		columns: ['gacha_content_id', 'gacha_id', 'item_id', 'drop_rate', 'capsule_id', 'quantity'],
		rows: [
			{ gacha_content_id: 1, gacha_id: 1, item_id: 101, drop_rate: '0.5000%', capsule_id: 2, quantity: 1 },
			{ gacha_content_id: 2, gacha_id: 1, item_id: 102, drop_rate: '4.5000%', capsule_id: 2, quantity: 1 },
			{ gacha_content_id: 3, gacha_id: 1, item_id: 103, drop_rate: '95.0000%', capsule_id: 1, quantity: 1 },
		],
	},
];

const columnLabels: Record<string, string> = {
	character_id: 'キャラクターID',
	character_name: 'キャラクター名',
	industry: '業界・テーマ',
	description: '説明',
	asset_key: 'アセットキー',
	item_id: 'アイテムID',
	item_name: 'アイテム名',
	item_type: 'アイテム種別',
	item_info: 'アイテム説明',
	rarity: 'レアリティ',
	gacha_id: 'ガチャID',
	gacha_name: 'ガチャ名',
	many: '必要硬貨枚数',
	start_at: '開催開始日時',
	end_at: '開催終了日時',
	capsule_id: 'カプセルID',
	capsule_name: 'カプセル名',
	gacha_content_id: '排出設定ID',
	drop_rate: '排出率',
	quantity: '排出数量',
	is_active: 'ステータス',
};

function displayColumn(column: string) {
	return columnLabels[column] ?? column.replaceAll('_', ' ');
}

export default function MasterPage() {
	const [activeKey, setActiveKey] = useState<MasterKey>('gachas');
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [saved, setSaved] = useState(false);
	const activeDefinition = definitions.find((definition) => definition.key === activeKey) ?? definitions[0];
	const filteredRows = useMemo(() => activeDefinition.rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))), [activeDefinition, query]);

	function selectMaster(key: MasterKey) {
		setActiveKey(key);
		setQuery('');
		setSidebarOpen(false);
	}

	function submitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setModalOpen(false);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2400);
	}

	return (
		<main className="master-shell">
			<header className="topbar">
				<button className="menu-button" aria-label="メニューを開く" onClick={() => setSidebarOpen(!sidebarOpen)}><span /><span /></button>
				<a className="brand" href="/master"><span className="brand-mark">K</span><span>株姫</span></a>
				<div className="top-context"><span className="context-dot" />ガチャマスタ管理</div>
				<div className="top-actions"><button className="icon-button" aria-label="通知">♢<span className="notification-dot" /></button><div className="user-profile"><span className="avatar">MS</span><span className="user-name">M. Sato</span><span className="chevron">⌄</span></div></div>
			</header>
			<div className={`layout ${sidebarOpen ? 'sidebar-visible' : ''}`}>
				<button className="sidebar-backdrop" aria-label="メニューを閉じる" onClick={() => setSidebarOpen(false)} />
				<Sidebar activePage="master" activeMaster={activeKey} onMasterSelect={selectMaster} />
				<section className="content">
					<div className="breadcrumb">MASTER DATA <span>/</span> ガチャマスタ</div>
					<div className="content-header"><div><p className="eyebrow">MASTER MANAGEMENT</p><h1>ガチャマスタ</h1><p className="muted">ガチャに関連する5つのマスターデータを一元管理します。</p></div><button className="primary-button" onClick={() => setModalOpen(true)}><span>＋</span> {activeDefinition.label}を追加</button></div>
					<div className="master-tabs" role="tablist">{definitions.map((definition) => <button className={`master-tab ${activeKey === definition.key ? 'selected' : ''}`} role="tab" aria-selected={activeKey === definition.key} onClick={() => selectMaster(definition.key)} key={definition.key}><strong>{definition.label}</strong><span>{definition.rows.length.toString().padStart(2, '0')} records</span></button>)}</div>
					<div className="section-heading"><div><span className="panel-kicker">{activeDefinition.key.toUpperCase()}</span><h2>{activeDefinition.label}</h2><p>{activeDefinition.description}</p></div><div className="table-tools"><label className="table-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="レコードを検索" aria-label="レコードを検索" /></label><button className="filter-button" aria-label="フィルター">☷</button></div></div>
					<div className="table-panel"><table><thead><tr>{activeDefinition.columns.map((column) => <th key={column}>{displayColumn(column)}<span>↕</span></th>)}<th aria-label="操作" /></tr></thead><tbody>{filteredRows.map((row) => <tr key={String(row[activeDefinition.columns[0]])}>{activeDefinition.columns.map((column) => <td key={column}>{column === 'is_active' ? <button className={`status ${row[column] === 'true' ? 'on' : 'off'}`} onClick={() => undefined}><span />{row[column] === 'true' ? '有効' : '停止中'}</button> : column === 'drop_rate' ? <strong className="rate">{row[column]}</strong> : <span className={column.endsWith('_id') ? 'code' : ''}>{row[column]}</span>}</td>)}<td><button className="row-action" aria-label={`${row[activeDefinition.columns[0]]}を編集`} onClick={() => setModalOpen(true)}>•••</button></td></tr>)}</tbody></table>{filteredRows.length === 0 && <div className="empty-state">一致するレコードがありません</div>}<div className="table-footer"><span>{filteredRows.length}件を表示 / 全{activeDefinition.rows.length}件</span><span>最終更新: 2026/08/25 15:30</span></div></div>
					{saved && <div className="toast"><span>✓</span>変更を保存しました</div>}
				</section>
			</div>
			{modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setModalOpen(false)}><form className="modal" onSubmit={submitForm} onMouseDown={(event) => event.stopPropagation()}><div className="modal-heading"><div><span className="panel-kicker">NEW RECORD</span><h2>{activeDefinition.label}を追加</h2></div><button type="button" className="close-button" aria-label="閉じる" onClick={() => setModalOpen(false)}>×</button></div><div className="form-grid">{activeDefinition.columns.slice(0, 4).map((column) => <label key={column}>{displayColumn(column)}<input required={column.endsWith('_id') || column.endsWith('_name')} placeholder={`${displayColumn(column)}を入力`} /></label>)}</div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>キャンセル</button><button className="primary-button" type="submit">保存する</button></div></form></div>}
			<style jsx>{`
	:global(*) { box-sizing: border-box; }
	:global(body) { margin: 0; background: #f4f6f5; color: #18252b; font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif; }
	.master-shell { min-height: 100vh; background: radial-gradient(circle at 88% 0%, #e6f1ec 0, transparent 34%), linear-gradient(135deg, #f4f6f5 0%, #f8faf9 48%, #eef5f1 100%); }.master-shell::before { content: ''; position: fixed; inset: 76px 0 0; pointer-events: none; opacity: .28; background-image: linear-gradient(#dce8e3 1px, transparent 1px), linear-gradient(90deg, #dce8e3 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, #000, transparent 72%); }
	.topbar { height: 76px; padding: 0 38px; background: #fbfdfc; border-bottom: 1px solid #dce7e2; display: flex; align-items: center; gap: 42px; position: relative; z-index: 5; }.brand { color: #183b38; font-family: Georgia, serif; font-size: 25px; font-weight: 700; display: flex; gap: 10px; align-items: center; text-decoration: none; letter-spacing: .04em; }.brand-mark { color: #fff; width: 30px; height: 30px; border-radius: 50%; background: #1c7770; display: grid; place-items: center; font: 700 16px Georgia; }.top-context { color: #71817d; font-size: 12px; border-left: 1px solid #e5ece9; padding-left: 28px; }.context-dot { display: inline-block; width: 7px; height: 7px; background: #de9567; border-radius: 50%; margin-right: 8px; }.top-actions { margin-left: auto; display: flex; align-items: center; gap: 26px; }.icon-button, .menu-button { border: 0; background: none; color: #627370; cursor: pointer; font-size: 24px; position: relative; }.notification-dot { width: 6px; height: 6px; background: #e47b55; border: 1px solid #fff; border-radius: 50%; position: absolute; right: 2px; top: 3px; }.user-profile { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 600; }.avatar { display: grid; place-items: center; width: 32px; height: 32px; color: #fff; background: #bc8061; border-radius: 50%; font-size: 11px; }.chevron { color: #8d9c99; font-size: 18px; }.menu-button { display: none; }
	.layout { display: flex; min-height: calc(100vh - 76px); }.sidebar { width: 244px; background: #fff; border-right: 1px solid #e4ebe8; padding: 34px 18px 22px; display: flex; flex-direction: column; flex-shrink: 0; }.workspace-label, .panel-kicker, .eyebrow { color: #95a4a1; font-size: 10px; letter-spacing: .13em; font-weight: 700; }.workspace-label { padding: 0 13px 12px; }.nav-item { display: flex; align-items: center; gap: 13px; height: 43px; padding: 0 13px; color: #647370; text-decoration: none; font-size: 13px; border-left: 3px solid transparent; }.nav-item:hover, .nav-item.active { color: #16665f; background: #eef7f3; border-left-color: #208b7d; font-weight: 700; }.nav-button { width: 100%; border-top: 0; border-right: 0; border-bottom: 0; text-align: left; cursor: pointer; font-family: inherit; }.nav-icon { width: 18px; text-align: center; font-size: 18px; font-family: Georgia, serif; }.sidebar-divider { height: 1px; background: #edf1f0; margin: 27px 13px 25px; }.sidebar-bottom { margin-top: auto; }.sync-status { margin: 20px 13px 0; color: #879591; font-size: 10px; }.sync-status small { display: block; color: #b0bbb8; margin: 6px 0 0 16px; }.sync-dot { display: inline-block; width: 7px; height: 7px; background: #43a67e; border-radius: 50%; margin-right: 8px; }
	.content { position: relative; z-index: 1; padding: 36px 5.5% 70px; width: 100%; max-width: 1440px; margin: 0 auto; }.breadcrumb { color: #94a19f; font-size: 10px; letter-spacing: .1em; margin-bottom: 28px; }.breadcrumb span { margin: 0 10px; color: #c3ceca; }.content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }.eyebrow { margin: 0 0 10px; }.content h1 { font-family: Georgia, serif; font-size: clamp(27px, 3vw, 38px); font-weight: 600; letter-spacing: .01em; margin: 0 0 8px; color: #173936; }.muted { color: #82918e; margin: 0; font-size: 13px; }.primary-button, .secondary-button { border: 0; padding: 11px 17px; cursor: pointer; font-weight: 700; border-radius: 4px; transition: background .18s ease, transform .18s ease, box-shadow .18s ease; }.primary-button { color: #fff; background: #247d70; box-shadow: 0 5px 12px #247d7025; }.primary-button:hover { background: #1b655c; transform: translateY(-1px); box-shadow: 0 8px 18px #247d7030; }.primary-button span { font-size: 18px; margin-right: 5px; }.master-tabs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: #dfe8e4; border: 1px solid #dfe8e4; margin-bottom: 30px; box-shadow: 0 8px 22px #31584b0c; }.master-tab { position: relative; text-align: left; min-height: 78px; border: 0; background: #fff; color: #788884; padding: 15px 17px; cursor: pointer; transition: background .18s ease, color .18s ease; }.master-tab:hover, .master-tab.selected { background: #eef7f3; color: #176a61; }.master-tab.selected::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #d78c62; }.master-tab strong, .master-tab span { display: block; }.master-tab strong { font-size: 13px; margin-bottom: 9px; }.master-tab span { color: #a1adaa; font: 10px Georgia, serif; }.section-heading { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px; }.section-heading h2 { font: 600 25px Georgia, serif; color: #1b3d38; margin: 0 0 7px; }.section-heading p { color: #879591; font-size: 12px; margin: 0; }.panel-kicker { display: block; margin-bottom: 9px; }.table-tools { display: flex; gap: 9px; }.table-search { width: 230px; height: 38px; display: flex; align-items: center; gap: 8px; padding: 0 11px; border: 1px solid #dce6e2; background: #fff; color: #95a4a1; transition: border-color .18s ease, box-shadow .18s ease; }.table-search:focus-within { border-color: #65a995; box-shadow: 0 0 0 3px #65a99518; }.table-search input { border: 0; outline: 0; width: 100%; font: 12px inherit; }.filter-button, .row-action, .close-button { border: 1px solid #dce6e2; background: #fff; color: #6f827c; cursor: pointer; }.filter-button { width: 38px; }.table-panel { background: #fff; border: 1px solid #dce6e2; box-shadow: 0 12px 28px #31584b10; overflow-x: auto; }table { width: 100%; border-collapse: collapse; min-width: 700px; }th { background: #eef4f1; color: #667a74; font-size: 10px; letter-spacing: .05em; font-weight: 700; text-align: left; padding: 14px 17px; border-bottom: 1px solid #d8e4df; white-space: nowrap; }th span { color: #a7b8b2; margin-left: 7px; }td { color: #566864; font-size: 12px; padding: 16px 17px; border-bottom: 1px solid #edf1ef; white-space: nowrap; }tr:last-child td { border-bottom: 0; }tr:hover td { background: #f7fbf9; }.code { font-family: Consolas, monospace; color: #2b756b; font-size: 11px; }.rate { color: #bc7658; font-family: Consolas, monospace; font-size: 12px; }.status { border: 0; background: none; cursor: pointer; font-size: 11px; color: #4e8072; }.status span { display: inline-block; width: 7px; height: 7px; background: #45ad82; border-radius: 50%; margin-right: 7px; }.status.off { color: #9ba6a3; }.status.off span { background: #bac3c0; }.row-action { border: 0; background: transparent; letter-spacing: 2px; }.empty-state { padding: 42px; color: #8a9995; text-align: center; font-size: 13px; }.table-footer { display: flex; justify-content: space-between; border-top: 1px solid #edf1ef; padding: 13px 17px; color: #9aa7a4; font-size: 10px; }.toast { position: fixed; right: 28px; bottom: 28px; background: #1e4943; color: #fff; padding: 14px 18px; box-shadow: 0 10px 30px #183b3830; font-size: 12px; }.toast span { color: #62c99b; margin-right: 8px; }
	.sidebar-backdrop { display: none; }.modal-backdrop { position: fixed; z-index: 10; inset: 0; background: #17393655; display: grid; place-items: center; padding: 20px; }.modal { width: min(520px, 100%); background: #fff; padding: 28px; border: 1px solid #dce7e2; box-shadow: 0 18px 50px #17393635; }.modal-heading { display: flex; justify-content: space-between; margin-bottom: 24px; }.modal h2 { color: #1b3d38; font: 600 24px Georgia, serif; margin: 0; }.close-button { border: 0; font-size: 25px; line-height: 1; }.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }.form-grid label { color: #71827d; display: flex; flex-direction: column; gap: 7px; font-size: 11px; }.form-grid input { border: 1px solid #dce6e2; padding: 11px; outline-color: #247d70; font: 12px inherit; }.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 28px; }.secondary-button { color: #657873; background: #f0f4f2; }
	@media (max-width: 900px) { .topbar { padding: 0 20px; gap: 20px; }.menu-button { display: flex; flex-direction: column; gap: 5px; padding: 5px 0; }.menu-button span { width: 20px; height: 2px; background: #56716c; }.top-context { padding-left: 15px; }.sidebar { position: fixed; z-index: 4; top: 76px; bottom: 0; left: 0; transform: translateX(-100%); transition: transform .2s ease; box-shadow: 10px 0 30px #183b3820; }.sidebar-visible .sidebar { transform: translateX(0); }.sidebar-visible .sidebar-backdrop { display: block; position: fixed; inset: 76px 0 0; z-index: 3; border: 0; background: #183b3840; }.content { padding: 30px 20px 55px; }.master-tabs { grid-template-columns: repeat(3, 1fr); }.section-heading { align-items: flex-start; gap: 18px; flex-direction: column; }.table-tools { width: 100%; }.table-search { flex: 1; } }
	@media (max-width: 520px) { .user-name, .chevron, .top-context { display: none; }.content-header { align-items: flex-start; flex-direction: column; gap: 18px; }.content-header .primary-button { align-self: stretch; }.master-tabs { grid-template-columns: repeat(2, 1fr); }.master-tab { min-height: 68px; }.form-grid { grid-template-columns: 1fr; }.table-footer { gap: 8px; flex-direction: column; } }
`}</style>
		</main>
	);
}
