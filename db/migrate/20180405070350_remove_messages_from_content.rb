class RemoveMessagesFromContent < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :content, :string
    remove_column :messages, :image, :string
  end
end
