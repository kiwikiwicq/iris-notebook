/**
 * Language store – manages language selection (English, Chinese, Spanish)
 * with localStorage persistence, <html> lang attribute updating, and full-site translations.
 * Uses Svelte 5 runes ($state).
 */

export type Language = 'en' | 'zh' | 'es';

export interface LanguageOption {
	code: Language;
	label: string;
	nativeName: string;
	flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
	{ code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
	{ code: 'zh', label: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
	{ code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' }
];

export const TRANSLATIONS = {
	en: {
		nav: {
			overview: 'Overview',
			articles: 'Articles',
			categories: 'Categories',
			projects: 'Projects',
			about: 'About',
			saved: 'Saved'
		},
		search: {
			placeholder: 'Search',
			modalPlaceholder: 'Search articles, topics, & projects...',
			shortcutHint: '⌘ K',
			noResults: 'No results found',
			recentSearches: 'Recent Searches',
			clear: 'Clear',
			resultsLabel: 'results'
		},
		hero: {
			badge: 'Iris Engineering Notebook',
			title: 'Software Architecture, Android, Linux & AI',
			subtitle: 'A personal knowledge base exploring modern UI systems, OS internals, developer tooling, and thoughtful tech notes.',
			browseArticles: 'Browse Articles',
			viewProjects: 'View Projects'
		},
		home: {
			featuredBadge: 'Handpicked',
			featuredTitle: 'Featured Articles',
			featuredDesc: 'Deep dives into architecture, performance, and modern development.',
			categoriesBadge: 'Taxonomy',
			categoriesTitle: 'Explore by Topic',
			latestBadge: 'Fresh Writing',
			latestTitle: 'Latest Posts',
			projectsBadge: 'Open Source',
			projectsTitle: 'Selected Projects',
			viewAllArticles: 'View All Articles →',
			viewAllProjects: 'View All Projects →',
			subscribeTitle: 'Stay in the Loop',
			subscribeDesc: 'Receive notifications when new essays and technical notes are published.',
			subscribePlaceholder: 'Enter your email address...',
			subscribeButton: 'Subscribe',
			subscribeSuccess: 'Thanks for subscribing!'
		},
		articlesPage: {
			title: 'All Articles',
			description: 'Comprehensive list of tutorials, architecture guides, and developer notes.',
			searchFilterPlaceholder: 'Filter by title, tag, or topic...',
			allCategories: 'All Topics',
			noArticlesFound: 'No articles match your filter criteria.',
			clearFilter: 'Clear Filter'
		},
		articleDetail: {
			toc: 'Table of Contents',
			minRead: 'min read',
			publishedOn: 'Published on',
			share: 'Share Article',
			copied: 'Link copied!',
			prevArticle: 'Previous Article',
			nextArticle: 'Next Article',
			backToArticles: '← Back to Articles',
			save: 'Save',
			saved: 'Saved'
		},
		categoriesPage: {
			title: 'Topics & Categories',
			description: 'Browse all writing categorized by technology domain.',
			articlesCount: 'articles'
		},
		projectsPage: {
			title: 'Open Source Projects',
			description: 'Showcase of applications, libraries, and experimental developer tools.',
			stars: 'stars',
			forks: 'forks',
			visitGithub: 'Visit GitHub',
			liveDemo: 'Live Demo'
		},
		aboutPage: {
			title: 'About Iris',
			subtitle: 'Personal digital garden of a software engineer, Android builder, and open-source enthusiast.',
			bioTitle: 'Biography',
			bioContent: 'Hello! I am Iris. I write software with a focus on fluid UI, clean system architecture, and modern mobile/web tech stacks. This notebook serves as my public digital garden for technical documentation and learnings.',
			expertiseTitle: 'Core Expertise',
			connectTitle: 'Get in Touch'
		},
		savedPage: {
			title: 'Saved Articles',
			description: 'Your bookmarked articles stored locally in your browser.',
			noSaved: 'No saved articles yet. Bookmark articles to read them later offline.'
		},
		footer: {
			tagline: 'Building thoughtful digital experiences with modern web & mobile architecture.',
			quickLinks: 'Quick Links',
			connect: 'Connect',
			rss: 'RSS Feed',
			copyright: 'All rights reserved.'
		},
		common: {
			language: 'Language',
			selectLanguage: 'Select Language',
			theme: 'Theme',
			glassStyle: 'Glass Style',
			backToTop: 'Back to top',
			readMore: 'Read More'
		}
	},
	zh: {
		nav: {
			overview: '概览',
			articles: '文章',
			categories: '分类',
			projects: '项目',
			about: '关于',
			saved: '书签'
		},
		search: {
			placeholder: '搜索',
			modalPlaceholder: '搜索文章、话题和项目...',
			shortcutHint: '⌘ K',
			noResults: '未找到相关结果',
			recentSearches: '最近搜索',
			clear: '清除',
			resultsLabel: '条结果'
		},
		hero: {
			badge: 'Iris 工程技术笔记',
			title: '软件架构、Android、Linux 与人工智能',
			subtitle: '探索现代 UI 系统、操作系统内核、开发者工具与技术随笔的个人知识库。',
			browseArticles: '浏览文章',
			viewProjects: '查看项目'
		},
		home: {
			featuredBadge: '精选选读',
			featuredTitle: '精选文章',
			featuredDesc: '深入剖析软件架构、系统性能与现代开发实战。',
			categoriesBadge: '分类指南',
			categoriesTitle: '按话题探索',
			latestBadge: '最新创作',
			latestTitle: '最新文章',
			projectsBadge: '开源项目',
			projectsTitle: '精选项目',
			viewAllArticles: '查看全部文章 →',
			viewAllProjects: '查看全部项目 →',
			subscribeTitle: '订阅更新',
			subscribeDesc: '在发布新随笔与技术文章时第一时间获取通知。',
			subscribePlaceholder: '输入您的电子邮箱地址...',
			subscribeButton: '订阅',
			subscribeSuccess: '感谢您的订阅！'
		},
		articlesPage: {
			title: '所有文章',
			description: '完整的技术教程、架构指南与开发者笔记列表。',
			searchFilterPlaceholder: '按标题、标签或话题筛选...',
			allCategories: '所有话题',
			noArticlesFound: '没有符合筛选条件的文章。',
			clearFilter: '清除筛选'
		},
		articleDetail: {
			toc: '文章目录',
			minRead: '分钟阅读',
			publishedOn: '发布于',
			share: '分享文章',
			copied: '链接已复制！',
			prevArticle: '上一篇文章',
			nextArticle: '下一篇文章',
			backToArticles: '← 返回文章列表',
			save: '保存',
			saved: '已保存'
		},
		categoriesPage: {
			title: '话题与分类',
			description: '按技术领域浏览所有写作与笔记。',
			articlesCount: '篇文章'
		},
		projectsPage: {
			title: '开源项目',
			description: '展示制作的应用、开源代码库与实验性开发者工具。',
			stars: '赞',
			forks: 'Fork',
			visitGithub: '访问 GitHub',
			liveDemo: '在线演示'
		},
		aboutPage: {
			title: '关于 Iris',
			subtitle: '一位软件工程师、Android 开发者与开源热心者的数字花园。',
			bioTitle: '个人简介',
			bioContent: '你好！我是 Iris。我致力于开发流畅用户界面、清晰系统架构及现代移动/Web 技术栈。本笔记本是我记录技术文档与心得的公开数字花园。',
			expertiseTitle: '核心技术栈',
			connectTitle: '联系方式'
		},
		savedPage: {
			title: '已保存文章',
			description: '您在浏览器本地保存的书签文章。',
			noSaved: '暂无已保存文章。收藏文章以便离线阅读。'
		},
		footer: {
			tagline: '用现代 Web 与移动架构打磨极致数字体验。',
			quickLinks: '快速链接',
			connect: '社交与联系',
			rss: 'RSS 订阅',
			copyright: '保留所有权利。'
		},
		common: {
			language: '语言',
			selectLanguage: '选择语言',
			theme: '主题',
			glassStyle: '磨砂风格',
			backToTop: '返回顶部',
			readMore: '阅读全文'
		}
	},
	es: {
		nav: {
			overview: 'Inicio',
			articles: 'Artículos',
			categories: 'Categorías',
			projects: 'Proyectos',
			about: 'Acerca de',
			saved: 'Guardados'
		},
		search: {
			placeholder: 'Buscar',
			modalPlaceholder: 'Buscar artículos, temas y proyectos...',
			shortcutHint: '⌘ K',
			noResults: 'No se encontraron resultados',
			recentSearches: 'Búsquedas recientes',
			clear: 'Limpiar',
			resultsLabel: 'resultados'
		},
		hero: {
			badge: 'Cuaderno de Ingeniería Iris',
			title: 'Arquitectura de Software, Android, Linux e IA',
			subtitle: 'Una base de conocimiento personal que explora sistemas UI modernos, internos de SO, herramientas y notas de desarrollo.',
			browseArticles: 'Explorar Artículos',
			viewProjects: 'Ver Proyectos'
		},
		home: {
			featuredBadge: 'Selección',
			featuredTitle: 'Artículos Destacados',
			featuredDesc: 'Análisis profundos sobre arquitectura, rendimiento y desarrollo moderno.',
			categoriesBadge: 'Taxonomía',
			categoriesTitle: 'Explorar por Tema',
			latestBadge: 'Publicaciones Recientes',
			latestTitle: 'Últimas Publicaciones',
			projectsBadge: 'Código Abierto',
			projectsTitle: 'Proyectos Destacados',
			viewAllArticles: 'Ver todos los artículos →',
			viewAllProjects: 'Ver todos los proyectos →',
			subscribeTitle: 'Mantente al día',
			subscribeDesc: 'Recibe notificaciones cuando se publiquen nuevos ensayos y notas técnicas.',
			subscribePlaceholder: 'Introduce tu correo electrónico...',
			subscribeButton: 'Suscribirse',
			subscribeSuccess: '¡Gracias por suscribirte!'
		},
		articlesPage: {
			title: 'Todos los Artículos',
			description: 'Lista completa de tutoriales, guías de arquitectura y notas de desarrollo.',
			searchFilterPlaceholder: 'Filtrar por título, etiqueta o tema...',
			allCategories: 'Todos los temas',
			noArticlesFound: 'No se encontraron artículos con tus filtros.',
			clearFilter: 'Limpiar filtro'
		},
		articleDetail: {
			toc: 'Tabla de Contenido',
			minRead: 'min de lectura',
			publishedOn: 'Publicado el',
			share: 'Compartir artículo',
			copied: '¡Enlace copiado!',
			prevArticle: 'Artículo anterior',
			nextArticle: 'Siguiente artículo',
			backToArticles: '← Volver a los artículos',
			save: 'Guardar',
			saved: 'Guardado'
		},
		categoriesPage: {
			title: 'Temas y Categorías',
			description: 'Explora todas las publicaciones categorizadas por dominio tecnológico.',
			articlesCount: 'artículos'
		},
		projectsPage: {
			title: 'Proyectos de Código Abierto',
			description: 'Exposición de aplicaciones, bibliotecas y herramientas experimentales.',
			stars: 'estrellas',
			forks: 'forks',
			visitGithub: 'Visitar GitHub',
			liveDemo: 'Demostración en vivo'
		},
		aboutPage: {
			title: 'Acerca de Iris',
			subtitle: 'Jardín digital personal de un ingeniero de software, desarrollador Android y entusiasta del código abierto.',
			bioTitle: 'Biografía',
			bioContent: '¡Hola! Soy Iris. Creo software enfocado en UI fluida, arquitectura limpia y tecnologías modernas de mobile/web. Este cuaderno es mi jardín digital público.',
			expertiseTitle: 'Competencias Clave',
			connectTitle: 'Contacto'
		},
		savedPage: {
			title: 'Artículos Guardados',
			description: 'Tus artículos guardados en el navegador.',
			noSaved: 'Aún no hay artículos guardados. Guarda artículos para leerlos más tarde.'
		},
		footer: {
			tagline: 'Creando experiencias digitales con arquitectura web y móvil moderna.',
			quickLinks: 'Enlaces rápidos',
			connect: 'Conectar',
			rss: 'Canal RSS',
			copyright: 'Todos los derechos reservados.'
		},
		common: {
			language: 'Idioma',
			selectLanguage: 'Seleccionar idioma',
			theme: 'Tema',
			glassStyle: 'Estilo cristal',
			backToTop: 'Volver arriba',
			readMore: 'Leer más'
		}
	}
};

/** Category content translation map */
export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, { name: string; description: string }>> = {
	android: {
		en: { name: 'Android', description: 'Jetpack Compose, Material Design, Kotlin, and Android development.' },
		zh: { name: 'Android', description: 'Jetpack Compose、Material Design、Kotlin 与 Android 移动开发。' },
		es: { name: 'Android', description: 'Jetpack Compose, Material Design, Kotlin y desarrollo de Android.' }
	},
	linux: {
		en: { name: 'Linux', description: 'System administration, ricing, dotfiles, shell scripting, and open source.' },
		zh: { name: 'Linux', description: '系统运维、桌面美化、Dotfiles、Shell 脚本及开源生态。' },
		es: { name: 'Linux', description: 'Administración de sistemas, ricing, dotfiles, scripts de shell y código abierto.' }
	},
	programming: {
		en: { name: 'Programming', description: 'Languages, algorithms, architecture, and software engineering craft.' },
		zh: { name: '编程', description: '编程语言、数据结构算法、系统架构与软件工程思想。' },
		es: { name: 'Programación', description: 'Lenguajes de programación, algoritmos, arquitectura y software.' }
	},
	ai: {
		en: { name: 'AI', description: 'Machine learning, LLMs, local AI tools, and thoughtful AI notes.' },
		zh: { name: 'AI 人工智能', description: '机器学习、大语言模型、本地 AI 工具及人工智能思考。' },
		es: { name: 'IA', description: 'Aprendizaje automático, LLM, herramientas locales de IA y notas de IA.' }
	},
	notes: {
		en: { name: 'Notes', description: 'Quick thoughts, reading notes, and personal reflections.' },
		zh: { name: '随笔笔记', description: '读书笔记、技术图谱与个人生活感悟。' },
		es: { name: 'Notas', description: 'Pensamientos rápidos, notas de lectura y reflexiones personales.' }
	}
};

/** Post content translation map */
export const POST_TRANSLATIONS: Record<string, Record<Language, { title: string; description: string }>> = {
	'hello-world': {
		en: {
			title: 'Welcome to Iris Engineering Notebook',
			description: 'An introduction to this blog, built with SvelteKit 5, Material You liquid glass UI, and Markdown.'
		},
		zh: {
			title: '欢迎来到 Iris 工程技术笔记',
			description: '本博客简介，使用 SvelteKit 5、Material You 流光玻璃 UI 与 Markdown 打造。'
		},
		es: {
			title: 'Bienvenido al Cuaderno de Ingeniería Iris',
			description: 'Una introducción a este blog, creado con SvelteKit 5, UI de cristal líquido Material You y Markdown.'
		}
	},
	'arch-linux-setup': {
		en: {
			title: 'Building a Minimalist Arch Linux Workstation',
			description: 'A step-by-step guide to installing Arch Linux, setting up Hyprland, and configuring dotfiles for developers.'
		},
		zh: {
			title: '打造极简风 Arch Linux 生产力工作站',
			description: 'Arch Linux 安装指南、Hyprland 窗口管理器与开发者 Dotfiles 配置实践。'
		},
		es: {
			title: 'Construyendo una Estación de Trabajo Arch Linux Minimalista',
			description: 'Guía paso a paso para instalar Arch Linux, configurar Hyprland y dotfiles para desarrolladores.'
		}
	},
	'joy-of-rust': {
		en: {
			title: 'The Joy of Memory Safety with Rust',
			description: 'Exploring ownership, lifetimes, and zero-cost abstractions in systems programming with Rust.'
		},
		zh: {
			title: 'Rust 内存安全与系统级编程之美',
			description: '探索 Rust 中的所有权机制、生命周期与无成本抽象在系统编程中的应用。'
		},
		es: {
			title: 'El Placer de la Seguridad de Memoria con Rust',
			description: 'Explorando la propiedad, tiempos de vida y abstracciones de costo cero en Rust.'
		}
	},
	'svelte-runes': {
		en: {
			title: 'Mastering Svelte 5 Runes & Fine-Grained Reactivity',
			description: 'How $state, $derived, and $effect change how we handle state in modern Svelte web applications.'
		},
		zh: {
			title: '深入掌握 Svelte 5 Runes 与细粒度响应性',
			description: '$state、$derived 与 $effect 如何颠覆 Svelte 现代 Web 应用程序的状态管理。'
		},
		es: {
			title: 'Dominando Svelte 5 Runes y Reactividad Fina',
			description: 'Cómo $state, $derived y $effect cambian el manejo de estado en aplicaciones Svelte.'
		}
	}
};

/** Project content translation map */
export const PROJECT_TRANSLATIONS: Record<string, Record<Language, { description: string }>> = {
	'horizon-launcher': {
		en: { description: 'A minimal, fast Android home screen launcher built with Jetpack Compose and Material You.' },
		zh: { description: '基于 Jetpack Compose 与 Material You 构建的极简高刷 Android 桌面启动器。' },
		es: { description: 'Un launcher de pantalla de inicio Android minimalista y rápido creado con Jetpack Compose.' }
	},
	'iris-notebook': {
		en: { description: 'This website! A personal knowledge base and blog built with SvelteKit and Material Design 3.' },
		zh: { description: '本网站！使用 SvelteKit 和 Material Design 3 打造的个人知识库与博客。' },
		es: { description: '¡Este sitio web! Una base de conocimiento personal y blog creado con SvelteKit y Material Design 3.' }
	}
};

const STORAGE_KEY = 'iris-language';

function createLanguageStore() {
	function getInitialLanguage(): Language {
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
			if (stored && (stored === 'en' || stored === 'zh' || stored === 'es')) {
				return stored;
			}
		}
		if (typeof navigator !== 'undefined') {
			const lang = navigator.language.toLowerCase();
			if (lang.startsWith('zh')) return 'zh';
			if (lang.startsWith('es')) return 'es';
		}
		return 'en';
	}

	let lang = $state<Language>('en');
	let initialized = $state(false);

	let isTranslating = $state(false);

	let translateInterval: any = null;

	function applyGoogleTranslate(targetLang: Language) {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		const targetCode = targetLang === 'zh' ? 'zh-CN' : targetLang === 'es' ? 'es' : 'en';
		const domain = window.location.hostname;

		if (targetLang === 'en') {
			document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
		} else {
			document.cookie = `googtrans=/en/${targetCode}; path=/; domain=${domain}`;
			document.cookie = `googtrans=/en/${targetCode}; path=/`;
		}

		const triggerSelect = () => {
			const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
			if (select) {
				if (select.value !== targetCode) {
					select.value = targetCode;
					select.dispatchEvent(new Event('change'));
				}
				return true;
			}
			return false;
		};

		if (!triggerSelect()) {
			// Poll up to 10 times (3 seconds max) until Google Translate widget renders
			if (translateInterval) clearInterval(translateInterval);
			let attempts = 0;
			translateInterval = setInterval(() => {
				attempts++;
				if (triggerSelect() || attempts > 10) {
					clearInterval(translateInterval);
					translateInterval = null;
				}
			}, 300);
		}

		// Inject Google Translate script if not loaded
		if (!document.getElementById('google-translate-script')) {
			const div = document.createElement('div');
			div.id = 'google_translate_element';
			div.style.display = 'none';
			document.body.appendChild(div);

			(window as any).googleTranslateElementInit = function () {
				new (window as any).google.translate.TranslateElement(
					{
						pageLanguage: 'en',
						includedLanguages: 'en,zh-CN,es',
						autoDisplay: false
					},
					'google_translate_element'
				);
			};

			const script = document.createElement('script');
			script.id = 'google-translate-script';
			script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
			script.async = true;
			document.head.appendChild(script);
		}
	}

	function applyLanguage(l: Language) {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('lang', l);
		}
		applyGoogleTranslate(l);
	}

	function init() {
		if (initialized) return;
		lang = getInitialLanguage();
		initialized = true;
		applyLanguage(lang);
	}

	function setLanguage(l: Language) {
		lang = l;
		applyLanguage(l);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, l);
		}
	}

	/** Client-side fallback API translator for Markdown article elements */
	async function translateArticleBody(container: HTMLElement) {
		if (lang === 'en' || !container) return;
		isTranslating = true;
		const targetLang = lang === 'zh' ? 'zh-CN' : 'es';

		try {
			const elements = container.querySelectorAll<HTMLElement>('p, h2, h3, h4, li, blockquote');
			const textNodes: { node: HTMLElement; original: string }[] = [];

			elements.forEach((el) => {
				// Avoid translating code blocks or existing translated nodes
				if (!el.closest('pre') && !el.closest('code') && el.innerText.trim()) {
					if (!el.getAttribute('data-original-text')) {
						el.setAttribute('data-original-text', el.innerHTML);
					}
					textNodes.push({ node: el, original: el.innerText.trim() });
				}
			});

			// Batch translate in chunks of 5 using free MyMemory API fallback
			for (let i = 0; i < Math.min(textNodes.length, 15); i++) {
				const item = textNodes[i];
				try {
					const res = await fetch(
						`https://api.mymemory.translated.net/get?q=${encodeURIComponent(item.original)}&langpair=en|${targetLang}`
					);
					if (res.ok) {
						const data = await res.json();
						if (data.responseData?.translatedText) {
							item.node.innerText = data.responseData.translatedText;
						}
					}
				} catch (e) {
					// Ignore individual node failures
				}
			}
		} finally {
			isTranslating = false;
		}
	}

	function restoreArticleBody(container: HTMLElement) {
		if (!container) return;
		const elements = container.querySelectorAll<HTMLElement>('[data-original-text]');
		elements.forEach((el) => {
			const orig = el.getAttribute('data-original-text');
			if (orig) el.innerHTML = orig;
		});
	}

	function translateCategory(slug: string, fallbackName: string, fallbackDesc: string) {
		const entry = CATEGORY_TRANSLATIONS[slug.toLowerCase()];
		if (entry && entry[lang]) {
			return entry[lang];
		}
		return { name: fallbackName, description: fallbackDesc };
	}

	function translatePost(slug: string, fallbackTitle: string, fallbackDesc: string) {
		const entry = POST_TRANSLATIONS[slug];
		if (entry && entry[lang]) {
			return entry[lang];
		}
		return { title: fallbackTitle, description: fallbackDesc };
	}

	function translateProject(name: string, fallbackDesc: string) {
		const entry = PROJECT_TRANSLATIONS[name];
		if (entry && entry[lang]) {
			return entry[lang].description;
		}
		return fallbackDesc;
	}

	return {
		get currentLanguage() {
			return lang;
		},
		get t() {
			return TRANSLATIONS[lang];
		},
		get initialized() {
			return initialized;
		},
		get isTranslating() {
			return isTranslating;
		},
		init,
		setLanguage,
		translateCategory,
		translatePost,
		translateProject,
		translateArticleBody,
		restoreArticleBody
	};
}

export const languageStore = createLanguageStore();
