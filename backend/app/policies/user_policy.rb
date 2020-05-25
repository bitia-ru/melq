class UserPolicy < ApplicationPolicy
  def show?
    true
  end

  def update?
    user
  end

  def destroy?
    user
  end
end
