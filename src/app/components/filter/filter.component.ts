import { Component, Output, EventEmitter } from '@angular/core';
import { PriorityLevel } from '../../models/priority-level.model';
import { FilterSettings } from '../../models/fillter-settings.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  settings: FilterSettings = { description: "", priority: PriorityLevel.NONE };

  @Output() settingsChange = new EventEmitter<FilterSettings>();

  updateSettings() {
    this.settingsChange.emit(this.settings);
  }

}
