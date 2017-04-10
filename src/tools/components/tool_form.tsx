import * as React from "react";
import { ToolFormProps } from "../interfaces";
import { t } from "i18next";
import {
  Row,
  Col,
  Widget,
  WidgetBody,
  WidgetHeader,
  BlurableInput,
  SaveBtn
} from "../../ui";
import { TaggedTool } from "../../resources/tagged_resources";
import { edit, destroy, init, saveAll } from "../../api/crud";

export class ToolForm extends React.Component<ToolFormProps, {}> {
  emptyTool = (): TaggedTool => {
    return {
      uuid: "ERROR: GENERATED BY REDUCER - SHOULD BE UNSEEN",
      kind: "tools",
      body: { name: "Tool " + (this.props.tools.length + 1) }
    }
  }

  render() {
    let toggle = () => this.props.toggle();
    let { dispatch, tools } = this.props;

    let isSaving = tools && tools
      .filter(x => x.saving).length !== 0;

    let isDirty = tools && tools
      .filter(x => x.dirty).length !== 0;

    let isSaved = !isSaving && !isDirty;

    return <Widget>
      <WidgetHeader
        helpText={t(`This is a list of all your FarmBot Tools.
          Click the Edit button to add, edit, or delete tools.`)}
        title="Tools">
        <button
          className="gray"
          onClick={() => { toggle(); }}
          hidden={!isSaved}>
          {t("Back")}
        </button>
        <SaveBtn
          isDirty={isDirty}
          isSaving={isSaving}
          isSaved={isSaved}
          onClick={() => { dispatch(saveAll(tools, () => { toggle(); })) }}
        />
        <button
          className="green"
          onClick={() => { dispatch(init(this.emptyTool())); }}>
          <i className="fa fa-plus" />
        </button>
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Col xs={12}>
            <label>{t("Tool Name")}</label>
          </Col>
        </Row>
        {tools.map((tool: TaggedTool) => {
          return <Row key={tool.body.id}>
            <Col xs={10}>
              <BlurableInput
                id={(tool.body.id || "Error getting ID").toString()}
                value={tool.body.name || "Error getting Name"}
                onCommit={(e) => {
                  dispatch(edit(tool, { name: e.currentTarget.value }));
                }}
              />
            </Col>
            <Col xs={2}>
              <button
                className="red"
                onClick={() => { dispatch(destroy(tool.uuid)); }}>
                <i className="fa fa-times"></i>
              </button>
            </Col>
          </Row>;
        })}
      </WidgetBody>
    </Widget>;
  }
};
