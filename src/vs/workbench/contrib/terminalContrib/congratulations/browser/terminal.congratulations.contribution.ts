/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from 'vs/base/common/lifecycle';
import { localize } from 'vs/nls';
import { INotificationService } from 'vs/platform/notification/common/notification';
import { ITerminalService } from 'vs/workbench/contrib/terminal/browser/terminal';
import { registerTerminalContribution } from 'vs/workbench/contrib/terminal/browser/terminalExtensions';
import { ITerminalContribution, ITerminalInstance } from 'vs/workbench/contrib/terminal/browser/terminal';

export class TerminalCongratulationsContribution extends Disposable implements ITerminalContribution {
	static readonly ID = 'terminal.congratulations';

	constructor(
		private readonly instance: ITerminalInstance,
		@INotificationService private readonly _notificationService: INotificationService,
		@ITerminalService private readonly _terminalService: ITerminalService
	) {
		super();

		// Subscribe to terminal creation events to show congratulatory message
		this._register(this._terminalService.onDidCreateInstance(() => {
			this._notificationService.info(
				localize('terminal.congrats', 'Congratulations! You\'re getting more productive with every new terminal!')
			);
		}));
	}
}

registerTerminalContribution(TerminalCongratulationsContribution.ID, TerminalCongratulationsContribution);
