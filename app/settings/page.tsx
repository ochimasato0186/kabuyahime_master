'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

const fields = [
	['apiKey', 'APIキー', 'FirebaseコンソールのWeb APIキー'],
	['authDomain', '認証ドメイン', '例: project-id.firebaseapp.com'],
	['projectId', 'プロジェクトID', 'FirebaseプロジェクトのID'],
	['storageBucket', 'Storageバケット', '例: project-id.firebasestorage.app'],
	['messagingSenderId', 'Messaging Sender ID', 'Firebase設定のSender ID'],
	['appId', 'アプリID', 'Firebase設定のApp ID'],
] as const;

type FirebaseSettings = Record<(typeof fields)[number][0], string>;
const storageKey = 'kabuyahime.firebase.settings';

export default function SettingsPage() {
	const [settings, setSettings] = useState<FirebaseSettings>(() => {
		if (typeof window === 'undefined') return { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
		const stored = window.localStorage.getItem(storageKey);
		return stored ? JSON.parse(stored) as FirebaseSettings : { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
	});
	const [saved, setSaved] = useState(false);

	function saveSettings(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		window.localStorage.setItem(storageKey, JSON.stringify(settings));
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2400);
	}

	return (
		<main className="settings-shell">
			<header className="topbar"><Link className="brand" href="/master"><span className="brand-mark">K</span><span>株姫</span></Link><div className="top-context"><span className="context-dot" />Firebase接続設定</div></header>
			<div className="page-layout"><Sidebar activePage="master" /><section className="content"><div className="breadcrumb">SETTINGS <span>/</span> FIREBASE</div><div className="content-header"><div><p className="eyebrow">FIREBASE CONNECTION</p><h1>Firebase設定</h1><p className="muted">FirebaseコンソールのWebアプリ設定を入力してください。</p></div></div><form className="settings-panel" onSubmit={saveSettings}><div className="settings-note">入力内容はこのブラウザのローカルストレージに保存されます。APIキーはFirestoreの接続情報であり、サービスアカウント秘密鍵は入力しないでください。</div><div className="form-grid">{fields.map(([key, label, description]) => <label key={key}>{label}<span>{description}</span><input type={key === 'apiKey' ? 'password' : 'text'} value={settings[key]} onChange={(event) => setSettings({ ...settings, [key]: event.target.value })} placeholder={label} autoComplete="off" /></label>)}</div><div className="form-actions"><button className="primary-button" type="submit">設定を保存する</button></div></form>{saved && <div className="toast"><span>✓</span>Firebase設定を保存しました</div>}</section></div>
			<style jsx>{`
	:global(*) { box-sizing: border-box; }
	:global(body) { margin: 0; background: #f4f6f5; color: #18252b; font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif; }
	.settings-shell { min-height: 100vh; background: radial-gradient(circle at 88% 0%, #e6f1ec 0, transparent 34%), linear-gradient(135deg, #f4f6f5 0%, #f8faf9 48%, #eef5f1 100%); }.topbar { height: 76px; padding: 0 38px; background: #fbfdfc; border-bottom: 1px solid #dce7e2; display: flex; align-items: center; gap: 42px; }.brand { color: #183b38; font: 700 25px Georgia, serif; display: flex; gap: 10px; align-items: center; text-decoration: none; }.brand-mark { color: #fff; width: 30px; height: 30px; border-radius: 50%; background: #1c7770; display: grid; place-items: center; font: 700 16px Georgia; }.top-context { color: #71817d; font-size: 12px; border-left: 1px solid #e5ece9; padding-left: 28px; }.context-dot { display: inline-block; width: 7px; height: 7px; background: #de9567; border-radius: 50%; margin-right: 8px; }.page-layout { display: flex; min-height: calc(100vh - 76px); }.content { width: 100%; max-width: 1000px; margin: 0 auto; padding: 44px 6%; }.breadcrumb { color: #94a19f; font-size: 10px; letter-spacing: .1em; margin-bottom: 32px; }.breadcrumb span { margin: 0 10px; color: #c3ceca; }.content-header { margin-bottom: 28px; }.eyebrow { color: #95a4a1; font-size: 10px; letter-spacing: .13em; font-weight: 700; }.content h1 { color: #173936; font: 600 38px Georgia, serif; margin: 0 0 9px; }.muted { color: #82918e; font-size: 13px; }.settings-panel { background: #fff; border: 1px solid #dce7e2; padding: 28px; }.settings-note { color: #6e817b; background: #eef7f3; border-left: 3px solid #208b7d; padding: 13px 15px; font-size: 12px; line-height: 1.7; margin-bottom: 25px; }.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 19px 22px; }.form-grid label { color: #526963; display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 700; }.form-grid label span { color: #9aa9a5; font-size: 10px; font-weight: 400; }.form-grid input { border: 1px solid #d7e3de; padding: 12px; color: #18322f; outline-color: #247d70; font: 12px Consolas, monospace; }.form-actions { display: flex; justify-content: flex-end; margin-top: 28px; }.primary-button { border: 0; padding: 11px 17px; cursor: pointer; color: #fff; background: #247d70; border-radius: 4px; font-weight: 700; }.toast { position: fixed; right: 28px; bottom: 28px; padding: 14px 18px; color: #276c63; background: #e5f4ec; border: 1px solid #b9ddca; font-size: 12px; }.toast span { margin-right: 8px; }
	@media (max-width: 760px) { .topbar { padding: 0 20px; }.top-context { padding-left: 15px; }.page-layout { display: block; }.content { padding: 30px 20px 55px; }.content h1 { font-size: 30px; }.form-grid { grid-template-columns: 1fr; }.settings-panel { padding: 20px; } }
			`}</style>
		</main>
	);
}