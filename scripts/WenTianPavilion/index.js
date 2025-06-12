const data = [
    {
        id: '1',
        title: "载人航天基建步骤",
        isCompleted: false,
        questions: [
            {
                id: '1-1',
                title: "载人航天的基本步骤是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '1-1-1',
                        content: "设计和建造航天器",
                    },
                    {
                        id: '1-1-2',
                        content: "进行载人飞行测试",
                    }
                ],
                answer: '1-1-1',
                analysis: "载人航天的基本步骤包括设计和建造航天器，以及进行载人飞行测试。载人航天的主要目标是探索太空和建立太空站。"
            },
            {
                id: '1-2',
                title: "载人航天的主要目标是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '1-2-1',
                        content: "探索太空",
                    },
                    {
                        id: '1-2-2',
                        content: "建立太空站",
                    }
                ],
                answer: '1-2-1',
                analysis: "载人航天的主要目标是探索太空和建立太空站。载人航天的主要任务是探索太空，寻找未知的世界。"
            }
        ],
        reward: "../../assets/images/WenTianPavilion/back01.svg",
    },
    {
        id: '2',
        title: "神舟系列载人飞船",
        isCompleted: false,
        questions: [
            {
                id: '2-1',
                title: "神舟系列载人飞船的主要任务是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '2-1-1',
                        content: "进行载人飞行测试",
                    },
                    {
                        id: '2-1-2',
                        content: "建立太空站",
                    }
                ],
                answer: '2-1-1',
                analysis: "神舟系列载人飞船的主要任务是进行载人飞行测试。它们是中国载人航天工程的重要组成部分。"
            },
            {
                id: '2-2',
                title: "神舟系列载人飞船的设计特点是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '2-2-1',
                        content: "具有高度的可靠性和安全性",
                    },
                    {
                        id: '2-2-2',
                        content: "可以在太空中长时间停留",
                    }
                ],
                answer: '2-2-1',
                analysis: "神舟系列载人飞船的设计特点是具有高度的可靠性和安全性。它们能够在太空中进行多次任务。"
            }
        ],
        reward: "../../assets/images/WenTianPavilion/back04.svg",
    },
    {
        id: '3',
        title: "空间站",
        isCompleted: false,
        questions: [
            {
                id: '3-1',
                title: "空间站的主要任务是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '3-1-1',
                        content: "进行载人飞行测试",
                    },
                    {
                        id: '3-1-2',
                        content: "进行科学实验和技术试验",
                    }
                ],
                answer: '3-1-2',
                analysis: "空间站的主要任务是进行科学实验和技术试验。它们是中国载人航天工程的重要组成部分。"
            }
        ],
        reward: "../../assets/images/WenTianPavilion/back02.svg",
    },
    {
        id: '4',
        title: "人造卫星",
        isCompleted: false,
        questions: [
            {
                id: '4-1',
                title: "人造卫星的主要任务是什么？",
                isCompleted: false,
                options: [
                    {
                        id: '4-1-1',
                        content: "探索太空",
                    },
                    {
                        id: '4-1-2',
                        content: "建立太空站",
                    }
                ],
                answer: '4-1-1',
                analysis: "人造卫星的主要任务是探索太空。它们是中国载人航天工程的重要组成部分。"
            }
        ],
        reward: "../../assets/images/WenTianPavilion/back03.svg",
    },
]

// 答题控制器
// 答题控制器
class QAController {
    constructor(data) {
        this.data = data;
        this.currentLevelIndex = 0;
        this.currentQuestionIndex = 0;
        this.currentRewardFragments = [];
        this.isAllLevelCompleted = false;
        this.selectedOptionId = null;

        // DOM 元素
        this.initInfo = document.querySelector(".init-info");
        this.levelInfo = document.querySelector(".level-info");
        this.startContent = document.querySelector(".start-content");
        this.qaBox = document.querySelector(".qa-box");
        this.fragmentBox = document.querySelector(".fragment-box");
        this.backpackBox = document.querySelector(".backpack-box");
        this.puzzleBox = document.querySelector(".puzzle-box");
        this.backEntry = document.querySelector(".back-entry");

        this.levelTitleElem = this.levelInfo.querySelector(".level-title");
        this.progressTextContainer = this.levelInfo.querySelector(".progress-text");
        this.processBarElem = this.levelInfo.querySelector(".process-bar");

        this.questionElem = this.qaBox.querySelector(".question");
        this.optionsContainer = this.qaBox.querySelector(".options");
        this.submitBtn = this.qaBox.querySelector(".submit");
        this.analysisBtn = this.qaBox.querySelector(".analysis");
        this.nextBtn = this.qaBox.querySelector(".next");
        this.prevBtn = this.qaBox.querySelector(".prev");
        this.analysisTextElem = null;

        this.fragmentContinueBtn = this.fragmentBox.querySelector(".continue-btn");
        this.fragmentImgElem = this.fragmentBox.querySelector(".fragment-img img");
        this.fragmentProgressElem = this.fragmentBox.querySelector(".progress-box");

        this.backpackContinueBtn = this.backpackBox.querySelector(".continue-btn");
        this.backpackItemContainer = this.backpackBox.querySelector(".backpack-item");
        this.backpackInfoElem = this.backpackBox.querySelector(".info");

        this.puzzleInfoElem = this.puzzleBox.querySelector(".info");
        this.puzzleItemContainer = this.puzzleBox.querySelector(".puzzle-item");

        this.startBtn = this.startContent.querySelector(".start-btn");

        this.init();
    }

    init() {
        this.showHideController([
            this.levelInfo,
            this.qaBox,
            this.fragmentBox,
            this.backpackBox,
            this.puzzleBox
        ], [this.initInfo, this.startContent]);

        // 初始时隐藏背包入口
        this.hideBackEntry();

        if (this.startBtn) {
            this.startBtn.addEventListener("click", () => {
                this.showHideController([
                    this.initInfo,
                    this.startContent
                ], [this.levelInfo, this.qaBox]);
                this.showBackEntry();
                this.updateHeader();
                this.showQuestion();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.style.cursor = 'pointer';
            this.nextBtn.addEventListener("click", () => {
                const level = this.getCurrentLevel();
                if (this.currentQuestionIndex < level.questions.length - 1) {
                    this.currentQuestionIndex++;
                } else if (this.currentQuestionIndex === level.questions.length - 1 && this.currentLevelIndex < this.data.length - 1) {
                    this.currentLevelIndex++;
                    this.currentQuestionIndex = 0;
                } else {
                    return;
                }
                this.selectedOptionId = null;
                this.updateHeader();
                this.showQuestion();
            });
        }

        if (this.prevBtn) {
            this.prevBtn.style.cursor = 'pointer';
            this.prevBtn.addEventListener("click", () => {
                if (this.currentQuestionIndex > 0) {
                    this.currentQuestionIndex--;
                } else if (this.currentQuestionIndex === 0 && this.currentLevelIndex > 0) {
                    this.currentLevelIndex--;
                    const prevLevel = this.getCurrentLevel();
                    this.currentQuestionIndex = prevLevel.questions.length - 1;
                } else {
                    return;
                }
                this.selectedOptionId = null;
                this.updateHeader();
                this.showQuestion();
            });
        }

        if (this.submitBtn) this.submitBtn.addEventListener("click", () => this.handleSubmit());
        if (this.analysisBtn) this.analysisBtn.addEventListener("click", () => this.showAnalysis());
        if (this.fragmentContinueBtn) this.fragmentContinueBtn.addEventListener("click", () => this.handleFragmentContinue());
        if (this.backpackContinueBtn) this.backpackContinueBtn.addEventListener("click", () => this.handleBackpackContinue());
        if (this.backEntry) {
            this.backEntry.style.cursor = 'pointer';
            this.backEntry.addEventListener("click", () => this.openBackpack());
        }
    }

    getCurrentLevel() {
        return this.data[this.currentLevelIndex];
    }

    getTotalQuestions() {
        return this.data.reduce((sum, lvl) => sum + (lvl.questions ? lvl.questions.length : 0), 0);
    }

    getCompletedQuestions() {
        let count = 0;
        this.data.forEach(lvl => {
            lvl.questions.forEach(q => {
                if (q.isCompleted) count++;
            });
        });
        return count;
    }

    updateHeader() {
        const level = this.getCurrentLevel();
        if (this.levelTitleElem) this.levelTitleElem.textContent = `当前关卡：${level.title}`;
        const totalAll = this.getTotalQuestions();
        const doneAll = this.getCompletedQuestions();
        if (this.progressTextContainer) {
            this.progressTextContainer.innerHTML = `<span style="color: #7a93ff;">已答 ${doneAll}</span>/${totalAll}`;
        }
        if (this.processBarElem) {
            const ratio = totalAll > 0 ? doneAll / totalAll : 0;
            this.processBarElem.style.width = `${ratio * 100}%`;
        }

        if (this.prevBtn) {
            const showPrev = this.currentQuestionIndex > 0 || this.currentLevelIndex > 0;
            this.prevBtn.style.visibility = showPrev ? 'visible' : 'hidden';
        }
        if (this.nextBtn) {
            const hasNextInLevel = this.currentQuestionIndex < level.questions.length - 1;
            const hasNextLevel = this.currentQuestionIndex === level.questions.length - 1 && this.currentLevelIndex < this.data.length - 1;
            this.nextBtn.style.visibility = (hasNextInLevel || hasNextLevel) ? 'visible' : 'hidden';
        }
        if (this.analysisTextElem) {
            this.analysisTextElem.remove();
            this.analysisTextElem = null;
        }
    }

    showQuestion() {
        const level = this.getCurrentLevel();
        const question = level.questions[this.currentQuestionIndex];
        if (this.questionElem) this.questionElem.innerHTML = `<img src="../assets/images/WenTianPavilion/QuestionChar.svg" alt="question"> ${question.title}`;
        if (this.optionsContainer) this.optionsContainer.innerHTML = '';
        if (this.optionsContainer) {
            question.options.forEach(opt => {
                const div = document.createElement('div');
                div.classList.add('option');
                div.dataset.id = opt.id;
                div.textContent = opt.content;
                div.style.cursor = 'pointer';
                div.style.border = '1px solid transparent';
                div.addEventListener('click', () => this.selectOption(div));
                this.optionsContainer.appendChild(div);
            });
        }
        this.selectedOptionId = null;
        if (this.submitBtn) {
            this.submitBtn.style.pointerEvents = 'auto';
            this.submitBtn.style.opacity = '1';
        }
        if (this.analysisBtn) this.analysisBtn.style.display = 'none';
    }

    selectOption(div) {
        if (this.optionsContainer) {
            Array.from(this.optionsContainer.children).forEach(child => {
                child.classList.remove('selected');
            });
        }
        div.classList.add('selected');
        div.style.borderBottom = '2px solid rgba(127, 48, 150, 1)';
        div.style.borderRadius = '10px';
        this.selectedOptionId = div.dataset.id;
    }

    handleSubmit() {
        const level = this.getCurrentLevel();
        const question = level.questions[this.currentQuestionIndex];
        if (!this.selectedOptionId) {
            return;
        }
        if (this.submitBtn) {
            this.submitBtn.style.pointerEvents = 'none';
            this.submitBtn.style.opacity = '0.6';
        }
        question.isCompleted = true;
        if (this.analysisBtn) this.analysisBtn.style.display = 'flex';
        const correct = this.selectedOptionId === question.answer;
        if (this.optionsContainer) {
            Array.from(this.optionsContainer.children).forEach(child => {
                if (child.dataset.id === question.answer) {
                    child.style.backgroundColor = '#e0ffe0';
                } else if (child.classList.contains('selected') && !correct) {
                    child.style.backgroundColor = '#ffe0e0';
                }
            });
        }
        if (this.currentQuestionIndex === level.questions.length - 1) {
            level.isCompleted = true;
            this.currentRewardFragments.push(level.reward);
            if (this.currentLevelIndex === this.data.length - 1) {
                this.isAllLevelCompleted = true;
                this.showHideController([
                    this.qaBox,
                    this.levelInfo,
                    this.fragmentBox,
                    this.backpackBox
                ], [this.puzzleBox]);
                this.renderPuzzle();
            } else {
                this.collectFragment();
            }
        }
    }

    showAnalysis() {
        if (this.analysisTextElem) return;
        const level = this.getCurrentLevel();
        const question = level.questions[this.currentQuestionIndex];
        const div = document.createElement('div');
        div.classList.add('analysis-text');
        div.textContent = question.analysis;
        if (this.qaBox) this.qaBox.appendChild(div);
        this.analysisTextElem = div;
    }

    collectFragment() {
        const level = this.getCurrentLevel();
        this.showHideController([
            this.qaBox,
            this.levelInfo
        ], [this.fragmentBox]);
        if (this.fragmentImgElem) this.fragmentImgElem.src = level.reward;
        const totalLevels = this.data.length;
        const got = this.currentRewardFragments.length;
        if (this.fragmentProgressElem) this.fragmentProgressElem.textContent = `碎片获取进度 ${got}/${totalLevels}`;
    }

    handleFragmentContinue() {
        if (this.currentLevelIndex < this.data.length - 1) {
            this.currentLevelIndex++;
            this.currentQuestionIndex = 0;
            this.selectedOptionId = null;
            this.showHideController([
                this.fragmentBox
            ], [this.levelInfo, this.qaBox]);
            this.updateHeader();
            this.showQuestion();
        } else {
            this.isAllLevelCompleted = true;
            this.showHideController([
                this.fragmentBox,
                this.levelInfo,
                this.qaBox
            ], [this.backpackBox]);
            this.renderBackpack();
        }
    }

    openBackpack() {
        this.showHideController([
            this.initInfo,
            this.startContent,
            this.levelInfo,
            this.qaBox,
            this.fragmentBox,
            this.puzzleBox
        ], [this.backpackBox]);
        this.renderBackpack();
    }

    renderBackpack() {
        const totalLevels = this.data.length;
        const got = this.currentRewardFragments.length;
        if (this.backpackInfoElem) this.backpackInfoElem.textContent = `碎片收集进度 ${got}/${totalLevels}`;
        if (this.backpackItemContainer) this.backpackItemContainer.innerHTML = '';
        for (let i = 0; i < totalLevels; i++) {
            const img = document.createElement('img');
            if (i < got) {
                img.src = this.currentRewardFragments[i];
                img.alt = 'fragment';
            } else {
                img.src = '../assets/images/WenTianPavilion/unkonw.svg';
                img.alt = 'unkonw';
            }
            if (this.backpackItemContainer) this.backpackItemContainer.appendChild(img);
        }
        if (got === totalLevels) {
            this.showHideController([
                this.initInfo,
                this.startContent,
                this.levelInfo,
                this.qaBox,
                this.fragmentBox,
                this.backpackBox
            ], [this.puzzleBox]);
            this.renderPuzzle();
        }
    }

    handleBackpackContinue() {
        if (this.isAllLevelCompleted) {
            this.openBackpack();
        } else {
            this.showHideController([
                this.backpackBox
            ], [this.levelInfo, this.qaBox]);
            this.updateHeader();
            this.showQuestion();
        }
    }

    renderPuzzle() {
        if (this.puzzleInfoElem) this.puzzleInfoElem.textContent = '拖拽碎片到对应位置完成拼图';
        if (this.puzzleItemContainer) this.puzzleItemContainer.innerHTML = '';

        // 创建拼图碎片容器
        const piecesContainer = document.createElement('div');
        piecesContainer.classList.add('puzzle-pieces');
        this.puzzleItemContainer.appendChild(piecesContainer);

        // 创建目标区域容器
        const targetsContainer = document.createElement('div');
        targetsContainer.classList.add('puzzle-targets');
        this.puzzleItemContainer.appendChild(targetsContainer);

        // 打乱碎片顺序，增加难度
        const shuffledFragments = [...this.currentRewardFragments].sort(() => Math.random() - 0.5);

        // 创建拼图碎片（打乱的顺序）
        shuffledFragments.forEach((src, displayIndex) => {
            // 找到这个碎片的原始索引
            const originalIndex = this.currentRewardFragments.indexOf(src);

            const piece = document.createElement('img');
            piece.src = src;
            piece.classList.add('puzzle-piece');
            piece.setAttribute('draggable', 'true');
            piece.dataset.index = originalIndex; // 使用原始索引作为正确位置
            piece.style.width = '8rem';
            piece.style.height = '8rem';
            piece.title = `碎片 ${originalIndex + 1}`;
            piecesContainer.appendChild(piece);

            // 添加拖拽事件
            piece.addEventListener('dragstart', (e) => this.handleDragStart(e));
        });

        // 创建目标区域（按正确顺序）
        this.currentRewardFragments.forEach((src, index) => {
            const target = document.createElement('div');
            target.classList.add('puzzle-target');
            target.dataset.index = index;
            target.style.width = '8rem';
            target.style.height = '8rem';
            target.textContent = `位置 ${index + 1}`;
            target.style.fontSize = '1.4rem';
            target.style.color = 'rgba(122, 147, 255, 0.7)';
            targetsContainer.appendChild(target);

            // 添加拖拽事件
            target.addEventListener('dragover', (e) => this.handleDragOver(e));
            target.addEventListener('drop', (e) => this.handleDrop(e));
            target.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            target.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        e.target.style.opacity = '0.5';
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');

        const pieceIndex = e.dataTransfer.getData('text/plain');
        const targetIndex = e.target.dataset.index;
        const piece = document.querySelector(`.puzzle-piece[data-index="${pieceIndex}"]`);

        if (!piece) return;

        // 恢复透明度
        piece.style.opacity = '1';

        // 检查是否已有碎片在目标位置
        const existingPiece = e.target.querySelector('.puzzle-piece');
        if (existingPiece) {
            // 将现有碎片移回碎片容器
            const piecesContainer = document.querySelector('.puzzle-pieces');
            piecesContainer.appendChild(existingPiece);
        }

        if (pieceIndex === targetIndex) {
            // 正确放置
            e.target.appendChild(piece);
            e.target.textContent = ''; // 清除位置提示文字
            e.target.classList.add('puzzle-completed');
            this.checkPuzzleCompletion();
        } else {
            // 错误放置，直接移回碎片容器
            e.target.appendChild(piece);
            e.target.textContent = ''; // 清除位置提示文字
            setTimeout(() => {
                const piecesContainer = document.querySelector('.puzzle-pieces');
                piecesContainer.appendChild(piece);
                e.target.textContent = `位置 ${parseInt(targetIndex) + 1}`;
                e.target.classList.remove('puzzle-completed');
            }, 500);
        }
    }

    checkPuzzleCompletion() {
        const targets = document.querySelectorAll('.puzzle-target');
        let correctCount = 0;
        let totalCount = targets.length;

        targets.forEach(target => {
            const piece = target.querySelector('.puzzle-piece');
            if (piece && piece.dataset.index === target.dataset.index) {
                correctCount++;
            }
        });

        // 更新进度显示
        if (this.puzzleInfoElem) {
            this.puzzleInfoElem.textContent = `拼图进度：${correctCount}/${totalCount} - ${correctCount === totalCount ? '完成！' : '继续拖拽碎片到正确位置'}`;
        }

        if (correctCount === totalCount) {
            // 拼图完成
            setTimeout(() => {
                alert('🎉 恭喜！拼图完成！\n\n你已经成功解开了宇宙的奥秘，收集了所有的知识碎片！');
                // 可以添加完成后的效果
                const puzzleContainer = document.querySelector('.puzzle-targets');
                if (puzzleContainer) {
                    puzzleContainer.style.borderColor = '#4ade80';
                    puzzleContainer.style.backgroundColor = 'rgba(74, 222, 128, 0.2)';
                    puzzleContainer.style.boxShadow = '0 0 2rem rgba(74, 222, 128, 0.5)';
                }
            }, 500);
        }
    }

    showBackEntry() {
        if (this.backEntry) {
            this.backEntry.style.display = 'flex';
            this.backEntry.style.opacity = '1';
        }
    }

    hideBackEntry() {
        if (this.backEntry) {
            this.backEntry.style.display = 'none';
            this.backEntry.style.opacity = '0';
        }
    }

    showHideController(hiddenControllers, showControllers) {
        // 立即隐藏不需要的元素
        hiddenControllers.forEach(controller => {
            if (controller) {
                controller.style.display = 'none';
                controller.style.opacity = '0';
            }
        });

        // 立即显示需要的元素，然后添加渐入效果
        showControllers.forEach(controller => {
            if (controller) {
                controller.style.display = 'flex';
                controller.style.opacity = '0';
                // 强制重排，确保display变化生效
                controller.offsetHeight;
                // 添加渐入效果
                setTimeout(() => {
                    controller.style.opacity = '1';
                }, 50);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const qaContainer = document.querySelector('.qa-container');
    new Mouse({
        defaultCursor: '../assets/images/common/MouseDefault.svg',
        clickCursor: '../assets/images/common/MouseClick.svg',
    });
    new StarBackground(qaContainer, {
        starCount: 300,
        starSizeMin: 0.08,
        starSizeMax: 0.16,
        xSpeed: 0.0002,
        ySpeed: 0.0002,
        elapsed: 0
    });
    new QAController(data);
});
